import * as Knex from 'knex';
export class StockService{
    constructor(private knex:Knex){}
async stockTrading(user_id:number,stock_symbol:string,is_buy:Boolean,price:number,shares:number){    //problem trading action will be delay   it will be done only the tradingCart accept time problem
    this.knex.transaction(async (trx)=>{
        const newTransactionID=await trx.insert({    
            user_id:user_id,
            stock_symbol:stock_symbol,
            is_buy:is_buy,
            price:price,
            shares:shares,   
        }).into('trade').returning('id')
         const OriginalAccountBalance=await trx.select('cash_in_hand').from('users').where('id',user_id)[0];  
         const NewAccountBalance=is_buy?OriginalAccountBalance-(price*shares):OriginalAccountBalance+(price*shares);
            await trx('users').update({
                cash_in_hand:NewAccountBalance,
            }).where('id',user_id)
const checkPortfolio=await trx.select('*').from('portfolio').where('id',user_id).where('stock_symbol',stock_symbol)
if(checkPortfolio.length===0){
       await trx.insert({  
        user_id:user_id,
        stock_symbol:stock_symbol,
        shares:is_buy?shares:-shares,
    }).into('portfolio')
}else{
    const OriginalShares=await trx.select('shares').from('users').where('id',user_id).where('stock_symbol',stock_symbol)[0]; //maybe incorrect by trx                        //update the balance
         const NewShares=is_buy?OriginalShares+shares:OriginalShares-shares;
            await trx('users').update({
            shares:NewShares,
            }).where('id',user_id)
}
         return [newTransactionID[0],NewAccountBalance]
    })
}
async AddStockTradingInstruction(user_id:number,stock_symbol:string,is_buy:Boolean,price:number,shares:number,dateTime:Date){ 
    return await this.knex('trade_cart').insert({
        user_id:user_id,
        stock_symbol:stock_symbol,
        is_buy:is_buy,
        price:price,
        shares:shares,
        expiration_date:dateTime,
    }).returning('id')
}
async loadSearchingResult(stockSymbol:string|null,stockName:string|null){   //get the result time by time to draw a graph
    if (stockSymbol!=null){
        return await this.knex.select('*').from('stock').where('stock_symbol',stockSymbol);
    }else if(stockName!=null){
        return await this.knex.select('*').from('stock').where('stockName',stockName);
    }else{
        return null
    }
}
async loadAllStockInfo(){   //show all basic info with latest  ,problem
    return await this.knex.select('*').from('stock')
}

async actionToWatchList(user_id:number,stock_symbol:string,watchListAction:string){  //maybe use for watch list
   return await this.knex('watchList').update({
                isWatchList:watchListAction==='Add'?true:false,
            }).where('id',user_id).where('stock_symbol',stock_symbol).returning('isWatchList')
}
async loadInvestedList(){   //show all basic info with latest  ,problem
    return await this.knex.select('*').from('stock')
}

}
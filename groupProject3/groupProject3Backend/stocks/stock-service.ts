import * as Knex from 'knex';
export class StockService{
    constructor(private knex:Knex){}
async stockTrading(user_id:number,stock_symbol:string,transaction_type_id:number,price:number,shares:number){    //problem trading action will be delay   it will be done only the tradingCart accept time problem
    return await this.knex.transaction(async (trx)=>{
        const newTransactionID=await trx.insert({    
            user_id:user_id,
            stock_symbol:stock_symbol,
            transaction_type_id,
            price:price,
            shares:shares,   
        }).into('trade').returning('id')
         const OriginalAccountBalance=await trx.select('cash_in_hand').from('users').where('id',user_id)[0];  
         const NewAccountBalance=OriginalAccountBalance+(price*shares)
         //is_buy?OriginalAccountBalance-(price*shares):OriginalAccountBalance+(price*shares);
            await trx('users').update({
                cash_in_hand:NewAccountBalance,
            }).where('id',user_id)
const checkPortfolio=await trx.select('*').from('portfolio').where('id',user_id).where('stock_symbol',stock_symbol)
if(checkPortfolio.length===0){
       await trx.insert({  
        user_id:user_id,
        stock_symbol:stock_symbol,
        shares:shares,
    }).into('portfolio')
}else{
    const OriginalShares=await trx.select('shares').from('users').where('id',user_id).where('stock_symbol',stock_symbol)[0]; //maybe incorrect by trx                        //update the balance
         const NewShares=OriginalShares+shares
         //is_buy?OriginalShares+shares:OriginalShares-shares;
            await trx('users').update({
            shares:NewShares,
            }).where('id',user_id)
}
         return [newTransactionID[0],NewAccountBalance]
    })
}
async AddStockTradingInstruction(user_id:number,stock_symbol:string,transaction_type_id:number,price:number,shares:number,dateTime:Date){ 
    return await this.knex('trade_cart').insert({
        user_id:user_id,
        stock_symbol:stock_symbol,
        transaction_type_id:transaction_type_id,
        price:price,
        shares:shares,
        transaction_status_id:2,
        exp_datetime:dateTime,
    }).returning('id')
}
async loadSearchingResult(stockSymbol:string|null,stockName:string|null){   //get the result time by time to draw a graph
    if (stockSymbol!==null){
        return await this.knex.select('*').from('stock_history').where('stock_symbol',stockSymbol);
    }else if(stockName!==null){
        const ResultStockSymbol=await this.knex('stock_symbol').from('stock_info').where('name',stockName)
        console.log(ResultStockSymbol)
        if(ResultStockSymbol.length>0){
        return await this.knex.select('*').from('stock_history').where('stock_symbol',ResultStockSymbol[0].stock_symbol);
        }else{
            return[]
        }
    }else{
        return []
    }
}
async loadAllStockInfo(){   //show all basic info with latest  ,problem
    return await this.knex.select('*').from('stock_current')
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
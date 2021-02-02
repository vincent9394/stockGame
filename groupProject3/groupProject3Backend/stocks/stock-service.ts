import * as Knex from 'knex';
import { userService } from '../main';
export class StockService{
    constructor(private knex:Knex){}
async stockTrading(user_id:number,stock_symbol:string,isBuy:Boolean,price:number,shares:number,portfolio_id:number){    //problem trading action will be delay   it will be done only the tradingCart accept time problem
    this.knex.transaction(async (trx)=>{
        const newTransactionID=await trx.insert({     //adding trading record
            user_id:user_id,
            stock_symbol:stock_symbol,
            isBuy:isBuy,
            price:price,
            shares:shares,
            portfolio_id:portfolio_id,   //should be check if there are portfolio or not
                                         //if yes,update share if no,insert a new portfolio
        }).into('trade').returning('id')
         const OriginalAccountBalance=await userService.getAccountBalance(user_id)[0]  //maybe incorrect by trx                        //update the balance
         const NewAccountBalance=isBuy?OriginalAccountBalance-(price*shares):OriginalAccountBalance+(price*shares);
            await trx('users').update({
                cash_in_hand:NewAccountBalance,
            }).where('id',user_id)

         return [newTransactionID[0],NewAccountBalance]
    })
}
async AddStockTradingInstruction(user_id:number,stock_symbol:string,isBuy:Boolean,price:number,shares:number,dateTime:any){ 
    return await this.knex('multi_media').insert({
        user_id:user_id,
        stock_symbol:stock_symbol,
        isBuy:isBuy,
        price:price,
        shares:shares,
        datetime:dateTime,
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
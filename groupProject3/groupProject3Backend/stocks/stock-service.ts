import * as Knex from 'knex';
export class StockService {
    constructor(private knex: Knex) { }
    async stockTrading(InstructionID: number, user_id: number, stock_symbol: string, transaction_type_id: number, price: number, shares: number) {    //problem trading action will be delay   it will be done only the tradingCart accept time problem
        return await this.knex.transaction(async (trx) => {
            const newTransactionID = await trx.insert({
                user_id: user_id,
                stock_symbol: stock_symbol,
                transaction_type_id,
                price: price,
                shares: shares,
            }).into('trade').returning('id')
            const OriginalAccountBalance = (await trx.select('cash_in_hand').from('users').where('id', user_id))[0].cash_in_hand;
            const NewAccountBalance = +(OriginalAccountBalance) - +(price * shares)
            //is_buy?OriginalAccountBalance-(price*shares):OriginalAccountBalance+(price*shares);
            await trx('users').update({
                cash_in_hand: NewAccountBalance,
            }).where('id', user_id)
            const checkPortfolio = await trx.select('*').from('portfolio').where('user_id', user_id).where('stock_symbol', stock_symbol)
            if (checkPortfolio.length === 0) {
                await trx.insert({
                    user_id: user_id,
                    stock_symbol: stock_symbol,
                    shares: shares,
                }).into('portfolio')
            } else {
                const OriginalShares = (await trx.select('shares').from('portfolio').where('user_id', user_id).where('stock_symbol', stock_symbol))[0].shares; 
                const NewShares = +(OriginalShares) + +(shares)
                //is_buy?OriginalShares+shares:OriginalShares-shares;
                await trx('portfolio').update({
                    shares: NewShares,
                }).where('user_id', user_id).where('stock_symbol', stock_symbol)
            }
            await this.knex('trade_cart').update({
                transaction_status_id: 3,
            }).where('id', InstructionID)
            return [newTransactionID[0], NewAccountBalance]
        })

    }
    async AddStockTradingInstruction(user_id: number, stock_symbol: string, transaction_type_id: number, price: number, shares: number, dateTime: string) {
        return await this.knex('trade_cart').insert({
            user_id: user_id,
            stock_symbol: stock_symbol,
            transaction_type_id: transaction_type_id,
            price: price,
            shares: shares,
            transaction_status_id: 2,
            exp_datetime: dateTime,
        }).returning('id')
    }
    async loadSearchingResult(stockSymbol: string | null, stockName: string | null) {   //get the result time by time to draw a graph
        if (stockSymbol !== null) {
            return await this.knex.select('*').from('stock_history').where('stock_symbol', stockSymbol);
        } else if (stockName !== null) {
            const ResultStockSymbol = await this.knex.select('stock_symbol').from('stock_info').where('name', stockName)
            if (ResultStockSymbol.length > 0) {
                return await this.knex.select('*').from('stock_history').where('stock_symbol', ResultStockSymbol[0].stock_symbol);
            } else {
                return []
            }
        } else {
            return []
        }
    }
    async loadAllStockInfo() {   //show all basic info with latest  ,problem
        return await this.knex.select('*').from('stock_current')
    }

    async actionToWatchList(user_id: number, stock_symbol: string, watchListAction: string) {  //maybe use for watch list
        if(watchListAction === 'Add'){
            return await this.knex('watch_list').insert({
                user_id:user_id,
                stock_symbol:stock_symbol,
            })
        }else{
            return await this.knex('watch_list').where('user_id',user_id).where('stock_symbol',stock_symbol).del()
        }
    }
    async loadWatchListSymbol(user_id: number) {   
        return await this.knex.select('stock_symbol').from('watch_list').where('user_id',user_id)
    }
    async loadInvestedList() {   //show all basic info with latest  ,problem
        return await this.knex.select('*').from('stock')
    }
    async loadPortfolio(user_id:number) {   //show all basic info with latest  ,problem
        return await this.knex.select('stock_symbol','shares').from('portfolio').where('user_id',user_id)
    }
    async loadInstruction(user_id:number) {   
        return await this.knex.select('*').from('trade_cart').where('user_id',user_id)
    }
    async importCurrentStock(stockData: { stock_Symbol: string, date: string, open: number, high: number, low: number, close: number, volume_ltc: number, volume_usd: number }) {
        return await this.knex('stock_current').update({
            date: stockData.date,
            open: stockData.open,
            high: stockData.high,
            low: stockData.low,
            close: stockData.close,
            volume_ltc: stockData.volume_ltc,
            volume_usd: stockData.volume_usd,

        }).where('stock_symbol', stockData.stock_Symbol).returning('id')
    }
    async importHistoryStock(stockData: { date: string, stock_Symbol: string, open: number, high: number, low: number, close: number, volume_ltc: number, volume_usd: number }) {
        return await this.knex('stock_history').insert({
            stock_symbol: stockData.stock_Symbol,
            date: stockData.date,
            open: stockData.open,
            high: stockData.high,
            low: stockData.low,
            close: stockData.close,
            volume_ltc: stockData.volume_ltc,
            volume_usd: stockData.volume_usd,

        }).returning('id')
    }

    async checkImportStockData(importDataDate: string, stock_symbol: string) {
        return await this.knex.select('id').from('stock_history').where('date', importDataDate).where('stock_symbol', stock_symbol)
    }

    async checkInstruction(currentPrice: number, stock_symbol: string) {
        const waitingBuyInstruction = await this.knex.select('*').from('trade_cart').where('transaction_status_id', 2).where('stock_symbol', stock_symbol).where('transaction_type_id', 1).where('price', '>=', currentPrice)
        //for buy
        if(waitingBuyInstruction.length>0){
        for (let i = 0; i < waitingBuyInstruction.length; i++) {
            await this.stockTrading(waitingBuyInstruction[i].id, waitingBuyInstruction[i].user_id, stock_symbol, 1, currentPrice, waitingBuyInstruction[i].shares)
        }
    }
        const waitingSellInstruction = await this.knex.select('*').from('trade_cart').where('transaction_status_id', 2).where('stock_symbol', stock_symbol).where('transaction_type_id', 2).where('price', '<=', currentPrice)
        //for sell
        if(waitingSellInstruction.length>0){
        for (let i = 0; i < waitingSellInstruction.length; i++) {
            await this.stockTrading(waitingSellInstruction[i].id, waitingSellInstruction[i].user_id, stock_symbol, 2, currentPrice, waitingSellInstruction[i].shares)
        }
    }
return {result:"done"}
    }

}
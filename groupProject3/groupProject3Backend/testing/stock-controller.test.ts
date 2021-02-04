import { StockController } from '../stocks/stock-controller'
import { StockService } from '../stocks/stock-service'
import { Request, Response } from 'express'
import * as Knex from 'knex';
jest.mock('express')
describe("stockController", () => {
    let stockController: StockController;
    let req: Request;
    let res: Response;
    let stockService: StockService;
    beforeEach(function () {
        stockService = new StockService({} as Knex);
        req = {
            body: {},
            file: {},
            params: {},
                user: {
                    id: 1,
                    username:'abc',
                    password:'123',

            }
        } as any as Request
        stockController = new StockController(stockService)
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any as Response;
    });

    it('should handle buy transaction correctly', async () => {
        req.body={
            stock_symbol:'abc',
            is_buy:true,
            price:10,
            shares:4000,
        }
        const tradingSpy = jest.spyOn(stockService, 'stockTrading')
        tradingSpy.mockReturnValue([{id:2},2000] as any)

    await stockController.StockTransaction(req,res)
expect(stockService.stockTrading).toBeCalledTimes(1)
expect(stockService.stockTrading).toBeCalledWith(1,'abc',true,10,4000)
expect(res.status).toBeCalledWith(200)
expect(res.json).toBeCalledWith({result:true})
    })
    it('should handle sell transaction correctly', async () => {
        req.body={
            stock_symbol:'abc',
            is_buy:false,
            price:10,
            shares:4000,
        }
        const tradingSpy = jest.spyOn(stockService, 'stockTrading')
        tradingSpy.mockReturnValue([{id:2},2000] as any)

    await stockController.StockTransaction(req,res)
expect(stockService.stockTrading).toBeCalledTimes(1)
expect(stockService.stockTrading).toBeCalledWith(1,'abc',false,10,4000)
expect(res.status).toBeCalledWith(200)
expect(res.json).toBeCalledWith({result:true})
    })
   
    it('should add transaction Instruction correctly', async () => {
        req.body={
            stock_symbol:'abc',
            is_buy:false,
            price:10,
            shares:4000,
            dateTime:'2020-3-1'
        }
        const tradingSpy = jest.spyOn(stockService, 'AddStockTradingInstruction')
        tradingSpy.mockReturnValue([{id:2}] as any)

    await stockController.writeStockTransactionInstruction(req,res)
expect(stockService.AddStockTradingInstruction).toBeCalledTimes(1)
expect(stockService.AddStockTradingInstruction).toBeCalledWith(1,'abc',false,10,4000,'2020-3-1')
expect(res.status).toBeCalledWith(200)
expect(res.json).toBeCalledWith({result:true})
    })

    it('should handle stock search by stockID correctly', async () => {
        req.body={
           stockID:'1123.TW',
           stockName:null,
        }
        const StockSearchSpy = jest.spyOn(stockService, 'loadSearchingResult')
        StockSearchSpy.mockReturnValue([{id:2,stock_symbol:'1123.TW',name:"abcTW",open:1.2,close:1.4}] as any)

    await stockController.StockSearch(req,res)
expect(stockService.loadSearchingResult).toBeCalledTimes(1)
expect(stockService.loadSearchingResult).toBeCalledWith("1123.TW",null)
expect(res.status).toBeCalledWith(200)
expect(res.json).toBeCalledWith({
    result:true,
    content:{id:2,stock_symbol:'1123.TW',name:"abcTW",open:1.2,close:1.4},
})
    })

    it('should handle stock search by stockName correctly', async () => {
        req.body={
           stockID:null,
           stockName:'AAPL',
        }
        const StockSearchSpy = jest.spyOn(stockService, 'loadSearchingResult')
        StockSearchSpy.mockReturnValue([{id:2,stock_symbol:'1234',name:"AAPL",open:1.2,close:1.4}] as any)

    await stockController.StockSearch(req,res)
expect(stockService.loadSearchingResult).toBeCalledTimes(1)
expect(stockService.loadSearchingResult).toBeCalledWith(null,"AAPL")
expect(res.status).toBeCalledWith(200)
expect(res.json).toBeCalledWith({
    result:true,
    content:{id:2,stock_symbol:'1234',name:"AAPL",open:1.2,close:1.4},
})
    })


    it('should show Stock Info correctly', async () => {
        
        const StockSearchSpy = jest.spyOn(stockService, 'loadAllStockInfo')
        StockSearchSpy.mockReturnValue([
            {id:2,stock_symbol:'1123.TW',name:"abcTW",open:1.2,close:1.4},
            {id:3,stock_symbol:'1133.HK',name:"abcHK",open:1.3,close:1.5},
        {id:4,stock_symbol:'1223.KR',name:"abcKR",open:1.2,close:1.4}] as any)

    await stockController.ShowStockInfo(req,res)
expect(stockService.loadAllStockInfo).toBeCalledTimes(1)
expect(res.status).toBeCalledWith(200)
expect(res.json).toBeCalledWith({
    result:true,
    content: [{id:2,stock_symbol:'1123.TW',name:"abcTW",open:1.2,close:1.4},
    {id:3,stock_symbol:'1133.HK',name:"abcHK",open:1.3,close:1.5},
{id:4,stock_symbol:'1223.KR',name:"abcKR",open:1.2,close:1.4}]
})
    })
    it('should add to watchList correctly', async () => {
        req.body={
            stock_symbol:'1123.HK',
           watchListAction:"Add"
           
        }
        const StockSearchSpy = jest.spyOn(stockService, 'actionToWatchList')
        StockSearchSpy.mockReturnValue([{isWatchList:true}] as any)
await stockController.ActionToWatchList(req,res)
expect(stockService.actionToWatchList).toBeCalledTimes(1)
expect(stockService.actionToWatchList).toBeCalledWith(1,"1123.HK","Add")
expect(res.status).toBeCalledWith(200)
expect(res.json).toBeCalledWith({
    result:true,
    watchListStatus:{isWatchList:true},
})
    })

    it('should remove from watchList correctly', async () => {
        req.body={
            stock_symbol:'1123.HK',
           watchListAction:"Remove"
           
        }
        const StockSearchSpy = jest.spyOn(stockService, 'actionToWatchList')
        StockSearchSpy.mockReturnValue([{isWatchList:false}] as any)
await stockController.ActionToWatchList(req,res)
expect(stockService.actionToWatchList).toBeCalledTimes(1)
expect(stockService.actionToWatchList).toBeCalledWith(1,"1123.HK","Remove")
expect(res.status).toBeCalledWith(200)
expect(res.json).toBeCalledWith({
    result:true,
    watchListStatus:{isWatchList:false},
})
    })
})
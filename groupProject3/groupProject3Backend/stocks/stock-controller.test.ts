import { StockController } from './stock-controller'
import { StockService } from './stock-service'
import { Request, Response } from 'express'
import * as Knex from 'knex';
jest.mock('express')
describe("homepageController", () => {
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
            session: {
                user: {
                    id: 1
                }
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
            isBuy:true,
            price:10,
            share:4000,
            portfolio_id:2
        }
        const id=1;
        const tradingSpy = jest.spyOn(stockService, 'stockTrading')
        tradingSpy.mockReturnValue([{ id: 2 }] as any)

    await stockController.StockTransaction(req,res)
expect(stockService.stockTrading).toBeCalledTimes(1)
expect(stockService.stockTrading).toBeCalledWith(id,'abc',true,10,4000,2)
expect(res.status).toBeCalledWith(200)
    })
    it('should handle sell transaction correctly', async () => {
        req.body={
            stock_symbol:'abc',
            isBuy:false,
            price:10,
            share:4000,
            portfolio_id:2
        }
        const id=1;
        const tradingSpy = jest.spyOn(stockService, 'stockTrading')
        tradingSpy.mockReturnValue([{ id: 2 },1000] as any)

    await stockController.StockTransaction(req,res)
expect(stockService.stockTrading).toBeCalledTimes(1)
expect(stockService.stockTrading).toBeCalledWith(id,'abc',false,10,4000,2)
expect(res.status).toBeCalledWith(200)
    })


})
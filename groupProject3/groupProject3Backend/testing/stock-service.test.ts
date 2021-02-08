import {StockService} from '../stocks/stock-service'
import  Knex from 'knex'
const knexConfig=require('../knexfile')
const knex=Knex(knexConfig['test'])
describe('stockService integrated with database',()=>{
    let stockService:StockService;
    beforeEach(async() => {
        stockService = new StockService(knex)
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
    });
    it('can work with Buy transaction',async()=>{
        const addTrading=await stockService.stockTrading(1,'abc',1,20,400)
        expect(addTrading).toHaveLength(2)

    })
    it('can work with sell transaction',async()=>{
        const addTrading=await stockService.stockTrading(1,'abc',2,20,400)
        expect(addTrading).toHaveLength(2)

    })
    it('can load SearchResult by stockSymbol',async()=>{
        const loadResult=await stockService.loadSearchingResult('AAPL',null)
        expect(loadResult).toHaveLength(5)
        expect(loadResult[0].stock_symbol).toBe('AAPL')

    })
    it('can load SearchResult by stockName',async()=>{
        const loadResult=await stockService.loadSearchingResult(null,"Apple Inc")
        expect(loadResult).toHaveLength(5)
        expect(loadResult[0].stockName).toBe("Apple Inc")

    })
    it("can't load SearchResult by IncorrectStockName",async()=>{
        const loadResult=await stockService.loadSearchingResult(null,"APPLED")
        expect(loadResult).toHaveLength(0)

    })
    it("can't load SearchResult by IncorrectStockSymbol",async()=>{
        const loadResult=await stockService.loadSearchingResult('AAPLT',null)
        expect(loadResult).toHaveLength(0)

    })
    it("can't load SearchResult if there are no name and no symbol",async()=>{
        const loadResult=await stockService.loadSearchingResult(null,null)
        expect(loadResult).toHaveLength(0)

    })

    it('can load all the stocks info In home',async()=>{ //need adjust expect
        const loadStockInfo=await stockService.loadAllStockInfo()
        expect(loadStockInfo).toHaveLength(3)

    })
    afterAll( ()=>{
        knex.destroy();
    })

})
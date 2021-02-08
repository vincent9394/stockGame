import {StockReducers} from './reducers';
import { IStockState } from './state';
import {  ToBuyStockSuccess, ToLoadAllStockSuccess, ToLoadSpecificStockSuccess, ToSoldStockSuccess} from './actions';


describe('StockReducers',()=>{
    let initialState:IStockState;

    beforeEach(()=>{
        initialState={
            stockIDArray:['11.hk'],
            stockAmountArray:[20],
            stockValueArray:[3.4],
            AllStockID:['23.hk'],
            AllStockDayMaximum:[2.1],
            AllStockDayMinimum:[1.0],
            SearchStockID:null,
            SearchStockName:null,
            SearchContent:null,
        }
    })

    it("should buy in correctly",()=>{
        const finalState = StockReducers( initialState, ToBuyStockSuccess('34.org',30,0.4));
        expect(finalState).toEqual({
            stockIDArray:['11.hk','34.org'],
            stockAmountArray:[20,30],
            stockValueArray:[3.4,0.4],
        });
    });

    it("should sold out correctly",()=>{
        const finalState = StockReducers( initialState, ToSoldStockSuccess('54.tw',-20,0.4));
        expect(finalState).toEqual({
            stockIDArray:['11.hk','34.org'],
            stockAmountArray:[20,-20],
            stockValueArray:[3.4,0.4],
        });
    });
    it("should load all the stock Info correctly",()=>{
        const finalState = StockReducers( initialState, ToLoadAllStockSuccess(['54.tw','34.jp','20.hk'],[5,2,1],[3,1.7,0.5]));
        expect(finalState).toEqual({
            AllStockID:['54.tw','34.jp','20.hk'],
            AllStockDayMaximum:[5,2,1],
            AllStockDayMinimum:[3,1.7,0.5],
        });
    });
    it("should load specific stock Info correctly",()=>{
        const finalState = StockReducers( initialState, ToLoadSpecificStockSuccess('34.usa','Winning',[{}]));
        expect(finalState).toEqual({
            SearchStockID:'34.usa',
            SearchStockName:'Winning',
        });
    });
   /* it("should handle fail case correctly",()=>{
        const finalState = StockReducers( initialState, ToSoldStockSuccess('54.tw',-20,0.4));
        expect(finalState).toEqual({
            stockIDArray:['11.hk'],
            stockAmountArray:[20,],
            stockValueArray:[3.4],
        });
    });*/
  


});
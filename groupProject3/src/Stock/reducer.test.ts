import {StockReducers} from './reducers';
import { IStockState } from './state';
import {  ToBuyStockSuccess, ToSoldStockSuccess} from './actions';


describe('StockReducers',()=>{
    let initialState:IStockState;

    beforeEach(()=>{
        initialState={
            stockIDArray:['11.hk'],
            stockAmountArray:[20],
            stockValueArray:[3.4],
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
   /* it("should handle fail case correctly",()=>{
        const finalState = StockReducers( initialState, ToSoldStockSuccess('54.tw',-20,0.4));
        expect(finalState).toEqual({
            stockIDArray:['11.hk'],
            stockAmountArray:[20,],
            stockValueArray:[3.4],
        });
    });*/
  


});
import { IStockState } from './state';
import { IStockActions } from './actions';

const initialState = {
    stockIDArray: [],
    stockAmountArray: [],
    stockValueArray: [],
    AllStockID:[],
    AllStockDayMaximum:[],
    AllStockDayMinimum:[],
    SearchStockID:null,
    SearchStockName:null,
    SearchContent:[],
    CurrentStockInfoArray:[],
}
export const StockReducers = (state: IStockState = initialState, action: IStockActions) => {
    const newStockIDArray = state.stockIDArray.slice()
    const newStockAmountArray = state.stockAmountArray.slice()
    const newStockValueArray = state.stockValueArray.slice()
    switch (action.type) {
        case "BUY_IN_STOCK":
            newStockIDArray.push(action.stockID)
            newStockAmountArray.push(action.stockAmount)
            newStockValueArray.push(action.stockValue)
            return {
                ...state,
                stockID: newStockIDArray,
                stockAmount: newStockAmountArray,
                stockValue: newStockValueArray,
            }
        case "SOLD_OUT_STOCK":
            newStockIDArray.push(action.stockID)
            newStockAmountArray.push(action.stockAmount)
            newStockValueArray.push(action.stockValue)
            return {
                ...state,
                stockID: newStockIDArray,
                stockAmount: newStockAmountArray,
                stockValue: newStockValueArray,
            }
            case "LOAD_ALL_STOCK":
            return {
                ...state,
                CurrentStockInfoArray:action.CurrentStockInfoArray
            }
            case "LOAD_SPECIFIC_STOCK":
            return {
                ...state,
                SearchStockID:action.SearchStockID,
                SearchStockName:action.SearchStockName,
                SearchContent:action.SearchContent,
            }
        default:
            return state
    }
}
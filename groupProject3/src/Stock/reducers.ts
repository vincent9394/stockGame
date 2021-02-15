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
    WatchListArray:[],
    Portfolio:[],
    InstructionHistory:[],
    SearchCompanyInfo:[],
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
                SearchCompanyInfo:action.SearchCompanyInfo,
            }
            case  "LOAD_WATCH_LIST":
                return {
                    ...state,
                 WatchListArray:action.WatchListArray,
                }
                case  "LOAD_PORTFOLIO":
                return {
                    ...state,
                 Portfolio:action.Portfolio,
                }
                case  "LOAD_INSTRUCTION_HISTORY":
                return {
                    ...state,
                    InstructionHistory:action.InstructionHistory,
                }
        default:
            return state
    }
}
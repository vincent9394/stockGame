export function ToBuyStockSuccess(stockID:string,stockAmount:number,stockValue:number){
    return{
        type:"BUY_IN_STOCK"as"BUY_IN_STOCK",
        stockID:stockID,
        stockAmount:stockAmount,
        stockValue:stockValue,
    }
}
export function ToSoldStockSuccess(stockID:string,stockAmount:number,stockValue:number){
    return{
        type:"SOLD_OUT_STOCK"as"SOLD_OUT_STOCK",
        stockID:stockID,
        stockAmount:stockAmount,
        stockValue:stockValue,
    }
}
export function ToLoadAllStockSuccess(InfoContent:any){  
    return{                       //can add more para if needed more info of stocks
        type:"LOAD_ALL_STOCK"as"LOAD_ALL_STOCK",
        CurrentStockInfoArray:InfoContent,
    }
}
export function ToLoadSpecificStockSuccess(SearchStockID:string|null,SearchStockName:string|null,content:any){  
    return{                       //can add more para if needed more info of stocks
        type:"LOAD_SPECIFIC_STOCK"as"LOAD_SPECIFIC_STOCK",
        SearchStockID:SearchStockID,
        SearchStockName:SearchStockName,
        SearchContent:content,
    }
}
export function ToChangeWatchListSuccess(stock_symbol:string,watchListAction:string){ 
    return{                       //can add more para if needed more info of stocks
        type:"CHANGE_WATCH_LIST"as"CHANGE_WATCH_LIST",

    }
}
export function ToLoadWatchListSuccess(InfoContent:any){  
    return{                       //can add more para if needed more info of stocks
        type:"LOAD_WATCH_LIST"as"LOAD_WATCH_LIST",
        WatchListArray:InfoContent,
    }
}
export function ToLoadPortfolioSuccess(InfoContent:any){  
    return{                       //can add more para if needed more info of stocks
        type:"LOAD_PORTFOLIO"as"LOAD_PORTFOLIO",
        Portfolio:InfoContent,
    }
}
export function ToLoadInstructionHistorySuccess(InfoContent:any){  
    return{                       //can add more para if needed more info of stocks
        type:"LOAD_INSTRUCTION_HISTORY"as"LOAD_INSTRUCTION_HISTORY",
        InstructionHistory:InfoContent,
    }
}

type FAILED="TO_BUY_STOCK_FAILED"|"TO_SOLD_STOCK_FAILED"|"TO_LOAD_ALL_STOCK_FAILED"|"TO_LOAD_SPECIFIC_STOCK_FAILED"|"TO_ADD_INSTRUCTION_FAILED"|"TO_CHANGE_WATCH_LIST_FAILED"|"TO_LOAD_WATCH_LIST_FAILED"|"TO_LOAD_PORTFOLIO_FAILED"|"TO_LOAD_INSTRUCTION_HISTORY_FAILED"
export function failed(type:FAILED,msg:string){
    return{
        type,msg
    }
}
type StockActionCreators=typeof ToBuyStockSuccess|typeof ToSoldStockSuccess|typeof ToLoadAllStockSuccess|typeof ToLoadSpecificStockSuccess|typeof ToChangeWatchListSuccess|typeof ToLoadWatchListSuccess|typeof ToLoadPortfolioSuccess|typeof ToLoadInstructionHistorySuccess|typeof failed
export type IStockActions=ReturnType<StockActionCreators>
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
export function ToLoadAllStockSuccess(AllStockID:string[], AllStockDayMaximum:number[],AllStockDayMinimum:number[]){  
    return{                       //can add more para if needed more info of stocks
        type:"LOAD_ALL_STOCK"as"LOAD_ALL_STOCK",
        AllStockID:AllStockID,
        AllStockDayMaximum:AllStockDayMaximum,
        AllStockDayMinimum:AllStockDayMinimum,
    }
}
export function ToLoadSpecificStockSuccess(SearchStockID:string|null,SearchStockName:string|null,content:{}[]){  
    return{                       //can add more para if needed more info of stocks
        type:"LOAD_SPECIFIC_STOCK"as"LOAD_SPECIFIC_STOCK",
        SearchStockID:SearchStockID,
        SearchStockName:SearchStockName,
        SearchContent:content,
    }
}


type FAILED="TO_BUY_STOCK_FAILED"|"TO_SOLD_STOCK_FAILED"|"TO_LOAD_ALL_STOCK_FAILED"|"TO_LOAD_SPECIFIC_STOCK_FAILED"
export function failed(type:FAILED,msg:string){
    return{
        type,msg
    }
}
type StockActionCreators=typeof ToBuyStockSuccess|typeof ToSoldStockSuccess|typeof ToLoadAllStockSuccess|typeof ToLoadSpecificStockSuccess|typeof failed
export type IStockActions=ReturnType<StockActionCreators>
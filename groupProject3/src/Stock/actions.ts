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

type FAILED="TO_BUY_STOCK_FAILED"|"TO_SOLD_STOCK_FAILED"
export function failed(type:FAILED,msg:string){
    return{
        type,msg
    }
}
type StockActionCreators=typeof ToBuyStockSuccess|typeof ToSoldStockSuccess|typeof failed
export type IStockActions=ReturnType<StockActionCreators>
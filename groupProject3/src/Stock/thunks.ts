import { Dispatch } from "react";
import { failed, IStockActions, ToBuyStockSuccess, ToSoldStockSuccess } from "./actions";

const { REACT_APP_API_BACKEND_SERVER } = process.env

export function ToBuyStockThunk( stockID:string,stockAmount:number,stockValue:number){
    return async (dispatch:Dispatch<IStockActions>)=>{
        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/buyStock`);
        const result = await res.json();
        if(result.isSuccess){
            dispatch(ToBuyStockSuccess(stockID,stockAmount,stockValue));
        }else{
            dispatch(failed("TO_BUY_STOCK_FAILED",result.msg))
        }
    }
}
export function ToSoldStockThunk( stockID:string,stockAmount:number,stockValue:number){
    return async (dispatch:Dispatch<IStockActions>)=>{
        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/soldStock`);
        const result = await res.json();
        if(result.isSuccess){
            dispatch(ToSoldStockSuccess(stockID,stockAmount,stockValue));
        }else{
            dispatch(failed("TO_SOLD_STOCK_FAILED",result.msg))
        }
    }
}
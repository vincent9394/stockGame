import { Dispatch } from "react";
import { failed, IStockActions, ToBuyStockSuccess, ToLoadAllStockSuccess, ToLoadSpecificStockSuccess, ToSoldStockSuccess } from "./actions";

const { REACT_APP_API_BACKEND_SERVER } = process.env

export function ToBuyStockThunk(stockID: string, stockAmount: number, stockValue: number) { //need adjust
    return async (dispatch: Dispatch<IStockActions>) => {
        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/buyStock`);
        const result = await res.json();
        if (result.isSuccess) {
            dispatch(ToBuyStockSuccess(stockID, stockAmount, stockValue));
        } else {
            dispatch(failed("TO_BUY_STOCK_FAILED", result.msg))
        }
    }
}
export function ToSoldStockThunk(stockID: string, stockAmount: number, stockValue: number) {
    return async (dispatch: Dispatch<IStockActions>) => {
        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/soldStock`);
        const result = await res.json();
        if (result.isSuccess) {
            dispatch(ToSoldStockSuccess(stockID, stockAmount, stockValue));
        } else {
            dispatch(failed("TO_SOLD_STOCK_FAILED", result.msg))
        }
    }
}
export function ToLoadAllStockThunk() {
    return async (dispatch: Dispatch<IStockActions>) => {
        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/homepageInfo`);
        const result = await res.json();
        if (result.result) {   //fetch to get all the stock ID and it maximum & minimum
            dispatch(ToLoadAllStockSuccess(result.AllStockID, result.AllStockDayMaximum, result.AllStockDayMinimum));
            //need to adjust para
        } else {
            dispatch(failed("TO_LOAD_ALL_STOCK_FAILED", result.msg))
        }
    }
}
export function ToLoadSpecificStockThunk(SearchStockID: string, SearchStockName: string, stockChoice: string) {
    return async (dispatch: Dispatch<IStockActions>) => {
        const formData = new FormData();
        if (stockChoice === 'SearchStockID') {
            formData.append('SearchStockID', SearchStockID);
        } else {
            formData.append('SearchStockName', SearchStockName)
        }

        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/search`, { //giving ID/name to Search Info
            method: "POST",
            body: formData
        });
        const result = await res.json();
        if (result.result) {   //fetch to get all the stock ID and it maximum & minimum
            ToLoadSpecificStockSuccess(SearchStockID, SearchStockName) //can add Search Info to Stock(keep 1 page as record)
        } else {
            dispatch(failed("TO_LOAD_SPECIFIC_STOCK_FAILED", result.msg))
        }
    }
}
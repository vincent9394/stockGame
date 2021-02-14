import { Dispatch } from "react";
import { failed, IStockActions, ToBuyStockSuccess, ToLoadAllStockSuccess, ToLoadInstructionHistorySuccess, ToLoadPortfolioSuccess, ToLoadSpecificStockSuccess, ToLoadWatchListSuccess, ToSoldStockSuccess } from "./actions";

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
            dispatch(ToLoadAllStockSuccess(result.content));
            //need to adjust para
        } else {
            dispatch(failed("TO_LOAD_ALL_STOCK_FAILED", result.msg))
        }
    }
}
export function ToLoadSpecificStockThunk(SearchStockID: string, SearchStockName: string, stockChoice: string) {
    return async (dispatch: Dispatch<IStockActions>) => {
        console.log(stockChoice)
        console.log(SearchStockID)
        const formObject:any={};
        if (stockChoice === 'SearchStockID') {
            formObject['SearchStockID']=SearchStockID;
        } else {
            formObject['SearchStockName']=SearchStockName;
        }

        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/search`, { //giving ID/name to Search Info
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            },
            method: "POST",
            body: JSON.stringify(formObject)
        });
        const result = await res.json();
        if (result.result) {   //fetch to get all the stock ID and it maximum & minimum
            dispatch(ToLoadSpecificStockSuccess(SearchStockID, SearchStockName,result.content)) //can add Search Info to Stock(keep 1 page as record)
        } else {
            dispatch(failed("TO_LOAD_SPECIFIC_STOCK_FAILED", result.msg))
        }
    }
}

export function ToAddInstructionThunk(stock_symbol:string,action:string,PurchasePrice:number,PurchaseVolume:number,EffectPeriod:string) {
    return async (dispatch: Dispatch<IStockActions>) => {
        const formObject:any={};
        formObject['stock_symbol']=stock_symbol;
        formObject['action']=action;
        formObject['price']=PurchasePrice;
        formObject['shares']=PurchaseVolume;
        formObject['exp_datetime']=EffectPeriod;
        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/addStockTradingInstruction`,{
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            },
            method: "POST",
            body: JSON.stringify(formObject)
        })
        
        const result = await res.json();
        if (result.result) {   //fetch to get all the stock ID and it maximum & minimum
             console.log("successful")
            //need to adjust para
        } else {
            dispatch(failed("TO_LOAD_ALL_STOCK_FAILED", result.msg))
        }
    }
}

export function ToChangeWatchListThunk(stock_symbol: string, watchListAction: string,) {
    return async (dispatch: Dispatch<IStockActions>) => {
        const formObject:any={};
            formObject['stock_symbol']=stock_symbol;
            formObject['watchListAction']=watchListAction;

        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/changeForWatchList`, { //giving ID/name to Search Info
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            },
            method: "POST",
            body: JSON.stringify(formObject)
        });
        const result = await res.json();
        if (result.result) {   
            dispatch(ToLoadWatchListSuccess(result.NewWatchList));
        } else {
            dispatch(failed("TO_CHANGE_WATCH_LIST_FAILED", result.msg))
        }
    }
}
export function ToLoadWatchListThunk() {
    return async (dispatch: Dispatch<IStockActions>) => {
        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/getWatchList`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        });
        const result = await res.json();
        if (result.result) {   //fetch to get all the stock ID and it maximum & minimum
            dispatch(ToLoadWatchListSuccess(result.content));
            //need to adjust para
        } else {
            dispatch(failed("TO_LOAD_WATCH_LIST_FAILED", result.msg))
        }
    }
}
export function ToLoadPortfolioThunk() {
    return async (dispatch: Dispatch<IStockActions>) => {
        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/LoadPortfolio`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        });
        const result = await res.json();
        if (result.result) {   //fetch to get all the stock ID and it maximum & minimum
            dispatch(ToLoadPortfolioSuccess(result.content));
            //need to adjust para
        } else {
            dispatch(failed("TO_LOAD_PORTFOLIO_FAILED", result.msg))
        }
    }
}
export function ToLoadInstructionHistoryThunk() {
    return async (dispatch: Dispatch<IStockActions>) => {
        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/LoadInstructionHistory`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        });
        const result = await res.json();
        if (result.result) {   //fetch to get all the stock ID and it maximum & minimum
            dispatch(ToLoadInstructionHistorySuccess(result.content));
            //need to adjust para
        } else {
            dispatch(failed("TO_LOAD_INSTRUCTION_HISTORY_FAILED", result.msg))
        }
    }
}

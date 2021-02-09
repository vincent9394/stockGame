export interface IStockState{
    CurrentStockInfoArray:{stock_symbol:string,date:string,open:number,high:number,low:number,close:number,volume_ltc:number,volume_usd:number}[],
    stockIDArray:string[],
    stockAmountArray:number[],
    stockValueArray:number[],
    AllStockID:string[],
    AllStockDayMaximum:number[],
    AllStockDayMinimum:number[],
    SearchStockID:string|null,
    SearchStockName:string|null,
    SearchContent:{stock_symbol:string,date:string,open:number,high:number,low:number,close:number,volume_ltc:number,volume_usd:number}[],
}
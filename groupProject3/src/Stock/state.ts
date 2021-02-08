export interface IStockState{
    stockIDArray:string[],
    stockAmountArray:number[],
    stockValueArray:number[],
    AllStockID:string[],
    AllStockDayMaximum:number[],
    AllStockDayMinimum:number[],
    SearchStockID:string|null,
    SearchStockName:string|null,
    SearchContent:{date:any,stock_symbol:any,open:any,high:any,low:any,close:any,volume_ltc:any,volume_usd:any}[]|null,
}
export interface IStockState{
    stockIDArray:string[],
    stockAmountArray:number[],
    stockValueArray:number[],
    AllStockID:string[],
    AllStockDayMaximum:number[],
    AllStockDayMinimum:number[],
    SearchStockID:string|null,
    SearchStockName:string|null,
    SearchContent:{}[]|null,
}
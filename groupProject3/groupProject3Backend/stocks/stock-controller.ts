import { StockService } from './stock-service'
import { Request, Response } from 'express'
export class StockController {
    constructor(private stockService: StockService) { }
    StockTransaction = async (req: Request, res: Response) => {
        try {
            if (!req.body.stock_symbol  ||req.body.is_buy==null|| !req.body.price || !req.body.shares||!req.user) {
                res.status(400).json({
                    result: false,
                    message: "req.body missing data"
                })
            } else {
                const tradingID = (await this.stockService.stockTrading(req.user.id, req.body.stock_symbol, req.body.is_buy, req.body.price, req.body.shares))[0].id
                if (tradingID != null) {
                    res.status(200).json({ result: true })
                } else {
                    res.status(500).json({
                        result: false,
                        message: "trading Failed"
                    })
                }
            }
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
    writeStockTransactionInstruction = async (req: Request, res: Response) => {
        //get userId from token   question for  ?how to Accept Instruction in correct price                         //how to reject Instruction after effective period
        try {
            if (!req.body.stock_symbol || req.body.is_buy==null || !req.body.price || !req.body.shares||!req.body.dateTime||!req.user) {
                res.status(400).json({
                    result: false,
                    message: "req.body missing data"
                })
            } else {

                const tradingInstructionID = (await this.stockService.AddStockTradingInstruction(req.user.id, req.body.stock_symbol, req.body.is_buy, req.body.price, req.body.shares, req.body.dateTime))[0].id
                if (tradingInstructionID != null) {
                    res.status(200).json({ result: true })
                } else {
                    res.status(500).json({
                        result: false,
                        message: "ADD trading Instruction Failed",
                    })
                }
            }
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
    StockSearch = async (req: Request, res: Response) => {
        try {
            let SearchingResult;
            if(req.body.SearchStockID){
                SearchingResult = await this.stockService.loadSearchingResult(req.body.SearchStockID, null)
            }else if(req.body.SearchName){
                SearchingResult = await this.stockService.loadSearchingResult(null, req.body.SearchName)
            }else{
                res.status(500).json({
                    result:false,
                    msg:"no searching Item",
                })
            }
            if(SearchingResult!=null){
                res.status(200).json({
                    result:true,
                    content:SearchingResult,
                })
            }else{
                res.status(400).json({result:false})
            }
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
    ShowStockInfo = async (req: Request, res: Response) => {
        try {    //unexpected result & need to update
            const StockBasicInfo=await this.stockService.loadAllStockInfo()
            res.status(200).json({
                result:true,
                content:StockBasicInfo,
            })
        }catch (err) {
            res.status(500).send(err.message)
        }
    }
    ActionToWatchList=async(req: Request, res: Response) => {
        try{
            if(!req.body.watchListAction||
                (req.body.watchListAction!=='Add'&&req.body.watchListAction!=='Remove')
                ){
                res.status(400).json({
                    result:false,
                    msg:"You did not have any watchList action"
                })
            }else{
                if(req.user){
                    const watchListStatus= await this.stockService.actionToWatchList(req.user.id,req.body.stock_symbol,req.body.watchListAction)
                
                    res.status(200).json({
                    result:true,
                    watchListStatus:watchListStatus[0],
                })
            }else{
                res.status(401).json({
                    result:false,
                    msg:"Unauthorized"
                })
            }
            }
        }catch (err) {
            res.status(500).send(err.message)
        }
    }
}
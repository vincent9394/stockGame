import { StockService } from './stock-service'
import { Request, Response } from 'express'
export class StockController {
    constructor(private stockService: StockService) { }
    StockTransaction = async (req: Request, res: Response) => {
        //get userId from token
        let id = 1;
        try {
            if (!req.body.stock_symbol || !req.body.isBuy || !req.body.price || !req.body.shares) {
                res.status(400).send({
                    result: false,
                    message: "req.body missing data"
                })
            } else {
                const tradingID = (await this.stockService.stockTrading(id, req.body.stock_symbol, req.body.isBuy, req.body.price, req.body.shares, req.body.portfolio_id))[0].id
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
        //get userId from token   question for  ?how to Accept Instruction in correct price 
        let id = 1;                           //how to reject Instruction after effective period
        try {
            if (!req.body.stock_symbol || !req.body.isBuy || !req.body.price || !req.body.shares||!req.body.datetime) {
                res.status(400).send({
                    result: false,
                    message: "req.body missing data"
                })
            } else {
                const tradingInstructionID = (await this.stockService.AddStockTradingInstruction(id, req.body.stock_symbol, req.body.isBuy, req.body.price, req.body.shares, req.body.datetime))[0].id
                if (tradingInstructionID != null) {
                    res.status(200).json({ result: true })
                } else {
                    res.status(500).json({
                        result: false,
                        message: "ADD trading Instruction Failed"
                    })
                }
            }
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
    StockSearch = async (req: Request, res: Response) => {
        try {
            const SearchingResult = await this.stockService.loadSearchingResult(req.body.stockID, req.body.stockName)
            if(SearchingResult!=null){
                res.status(200).json({
                    Result:true,
                    content:SearchingResult[0],
                })
            }else{
                res.status(400).json({Result:false})
            }
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
    ShowStockInfo = async (req: Request, res: Response) => {
        try {    //unexpected result & need to update
            const StockBasicInfo=await this.stockService.loadAllStockInfo()
            res.status(200).json({
                Result:true,
                content:StockBasicInfo,
            })
        }catch (err) {
            res.status(500).send(err.message)
        }
    }
    ActionToWatchList=async(req: Request, res: Response) => {
        try{
            if(!req.body.watchListAction||
                (req.body.watchListAction!=='Add'||req.body.watchListAction!=='Remove')
                ){
                res.status(400).json({
                    Result:false,
                    msg:"You did not have any watchList action"
                })
            }else{
                    const watchListStatus= await this.stockService.actionToWatchList(req.body.userID,req.body.stock_symbol,req.body.watchListAction)
                res.status(200).json({
                    result:true,
                    watchListStatus:watchListStatus,
                })
            }
        }catch (err) {
            res.status(500).send(err.message)
        }
    }
}
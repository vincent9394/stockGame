import { StockService } from './stock-service'
import { KafkaService } from '../kafka/kafka-service'
import { Request, Response } from 'express'
export class StockController {
    constructor(private stockService: StockService, private kafkaService: KafkaService) { }
    /*  StockTransaction = async (req: Request, res: Response) => {
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
      }*/
    writeStockTransactionInstruction = async (req: Request, res: Response) => {
        //get userId from token   question for  ?how to Accept Instruction in correct price 
        console.log(req.body)                        //how to reject Instruction after effective period
        try {
            if (!req.body.stock_symbol || req.body.action == null || !req.body.price || !req.body.shares || !req.body.exp_datetime || !req.user) {
                res.status(400).json({
                    result: false,
                    message: "req.body missing data"
                })
            } else {
                let transactionType;
                req.body.action === "BUY" ? transactionType = 1 : transactionType = 2;
                req.body.action === "BUY" ? req.body.shares = +(req.body.shares) : req.body.shares = -(req.body.shares);

                const tradingInstructionID = (await this.stockService.AddStockTradingInstruction(req.user.id, req.body.stock_symbol, transactionType, req.body.price, req.body.shares, req.body.exp_datetime))[0]
                console.log(tradingInstructionID)
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
            let kafkaResult;
            if (req.body.SearchStockID) {
                try {
                    kafkaResult = await this.kafkaService.sendSearch(req.body.SearchStockID, null);
                    kafkaResult = kafkaResult;
                } catch {
                    console.log("kafka connection problem")
                }
                SearchingResult = await this.stockService.loadSearchingResult(req.body.SearchStockID, null)
            } else if (req.body.SearchName) {
                try {
                    kafkaResult = await this.kafkaService.sendSearch(null, req.body.SearchName);
                    kafkaResult = kafkaResult;
                } catch {
                    console.log("kafka connection problem")
                }
                SearchingResult = await this.stockService.loadSearchingResult(null, req.body.SearchName)
            } else {
                res.status(401).json({
                    result: false,
                    msg: "no searching Item",
                })
            }
            if (SearchingResult != null) {
                res.status(200).json({
                    result: true,
                    content: SearchingResult,
                })
            } else {
                res.status(400).json({ result: false })
            }
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
    ShowStockInfo = async (req: Request, res: Response) => {
        try {    //unexpected result & need to update
            const StockBasicInfo = await this.stockService.loadAllStockInfo()
            res.status(200).json({
                result: true,
                content: StockBasicInfo,
            })
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
    GetWatchList = async (req: Request, res: Response) => {
        try {    //unexpected result & need to update
            if(req.user){
            const WatchListInfo=await this.stockService.loadWatchListSymbol(req.user.id)
            res.status(200).json({
                result:true,
                content:WatchListInfo,
            
            })
        }
        }catch (err) {
            res.status(500).send(err.message)
        }
    }
    GetPortfolio = async (req: Request, res: Response) => {
        try {   
            if(req.user){
            const portfolio=await this.stockService.loadPortfolio(req.user.id)
            res.status(200).json({
                result:true,
                content:portfolio,
            
            })
        }
        }catch (err) {
            res.status(500).send(err.message)
        }
    }
    GetInstructionHistory = async (req: Request, res: Response) => {
        try {   
            if(req.user){
            const InstructionHistory=await this.stockService.loadInstruction(req.user.id)
            res.status(200).json({
                result:true,
                content:InstructionHistory,
            
            })
        }
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
                    result: false,
                    msg: "You did not have any watchList action"
                })
            }else{
                if(req.user){
                    const actionWatchList= await this.stockService.actionToWatchList(req.user.id,req.body.stock_symbol,req.body.watchListAction)
                    if (actionWatchList!=null){
                        const WatchListInfo=await this.stockService.loadWatchListSymbol(req.user.id)
                        res.status(200).json({
                            result: true,
                             NewWatchList:WatchListInfo,
                        })
                    }else{res.status(500).json({
                        result: false,
                        msg: "failed to Action"
                    })}
                   
                } else {
                    res.status(401).json({
                        result: false,
                        msg: "Unauthorized"
                    })
                }
            }
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
    /*ImportCurrentStock=async(req: Request, res: Response) => {
        const StockId=await this.importCurrentStock(ImportData)
    }
    ImportHistoryStock=async(ImportData:any) => {
       const StockId=await this.importHistoryStock(ImportData)
    }*/

}
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { stockService } from "./main";
dotenv.config();
export const importCurrentStockRoutes = express.Router();

importCurrentStockRoutes.use(bodyParser.urlencoded({ extended: true }));
importCurrentStockRoutes.use(bodyParser.json());

let tickets: string[] = [
    "AAPL",
    "GOOGL",
    "TSLA",
];

//setInterval
async function updateStock(){
	for (let ticket of tickets) {
		// you need to apply for a token from alphavantage to obtain a key for the following api:
		const request = await fetch(
			`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticket}&interval=1min&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
		);
		// const request = await fetch(
		//     `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`
		// );
		const data = await request.json();

		let stockData = Object.values(Object.values(data));
		let dataOnly: any = Object.values(stockData)[1];
		let dataTime = Object.keys(dataOnly);
		let dataList: any = Object.values(dataOnly);
		console.log(ticket + "----------------------------------------")

		//for (let i = 0; i < dataTime.length; i++) {
			//const dataID=await stockService.checkImportStockData(dataTime[0],ticket)
			//if(dataID.length===0){
			let reformedData = {
				'date': dataTime[0],//dataTime[i],
				'stock_Symbol': ticket,
				'open':0,
				 'high':0,
				 'low': 0,
				 'close':0,
				 'volume_ltc':0,
				 'volume_usd':0,
			};
			for (let key in dataList[0]) { //dataList[i]
				if (key.slice(3) === "volume") {
					reformedData["volume_ltc"] = (dataList[0][key] * 1);
				} else {
					reformedData[`${key.slice(3)}`] = (dataList[0][key] * 1);
				}
			}
			// @ts-ignore
			reformedData["volume_usd"] = reformedData.close * reformedData.volume_ltc;
			console.log(">>>>>>>>>>>>>>>>>>> new data")
			console.log(reformedData);
				await stockService.importCurrentStock(reformedData)
				await stockService.importHistoryStock(reformedData)
				await stockService.checkInstruction(reformedData.close,reformedData.stock_Symbol)
		//	}



		//}

	}
} //, 60 * 1000 + Math.random() * 10 * 1000);
setInterval(updateStock,60 * 1000 + Math.random() * 10 * 1000)


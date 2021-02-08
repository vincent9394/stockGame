import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let tickets: string[] = [
    "AAPL",
    "GOOGL",
    "TSLA",
];

//setInterval
(async () => {
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

		for (let i = 0; i < dataTime.length; i++) {
			let reformedData = {
				'date': dataTime[i],
				'stock_symbol': ticket,
			};
			for (let key in dataList[i]) {
				if (key.slice(3) == "volume") {
					reformedData["volume_ltc"] = (dataList[i][key] * 1);
				} else {
					reformedData[`${key.slice(3)}`] = (dataList[i][key] * 1);
				}
			}
			// @ts-ignore
			reformedData["volume_usd"] = reformedData.close * reformedData.volume_ltc;
			console.log(">>>>>>>>>>>>>>>>>>> new data")
			console.log(reformedData);
		}

	}
})() //, 60 * 1000 + Math.random() * 10 * 1000);


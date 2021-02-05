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

setInterval( async () =>{
    let datas = [];
    for (let ticket of tickets) {
        // you need to apply for a token from alphavantage to obtain a key for the following api:
        const request = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticket}&interval=1min&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
        );
        // const request = await fetch(
        //     `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`
        // );
        const data = await request.json();
        console.log(`---------------Printing data ${ticket} -------------------------`)
        console.log(new Date())
        console.log(data)
        datas.push(data)
    }
}, 60 * 1000 + Math.random() * 10 * 1000);


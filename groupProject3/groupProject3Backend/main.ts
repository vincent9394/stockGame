import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import Knex from 'knex';
import { UserService } from './users/user-service';
import { UserController } from './users/user-controller';
import { createRoute } from './routes'
import { StockController } from './stocks/stock-controller';
import { StockService } from './stocks/stock-service';
import { importCurrentStockRoutes } from './alphavantage';
import { Kafka } from 'kafkajs';
import { KafkaController } from './kafka/kafka-controller';
import { KafkaService } from './kafka/kafka-service';
const knexConfig = require('./knexfile');
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"])
export const userService = new UserService(knex)
const userController = new UserController(userService)
export const stockService = new StockService(knex)

// setup kafka
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});
const producer = kafka.producer();
(async () => { await producer.connect(); })();
export const kafkaService = new KafkaService(producer);
const kafkaController = new KafkaController(kafkaService);
const stockController = new StockController(stockService,kafkaService)
const routes = createRoute(userController, stockController, kafkaController);

const app = express()
app.use(cors({
  origin: [process.env.REACT_HOST!]
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)
app.use(importCurrentStockRoutes)

const port = process.env.BackEndPort || 8000

app.listen(port, () => {
  console.log('Listening on port ' + port)
})
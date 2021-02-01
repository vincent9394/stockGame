import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import Knex from 'knex';
import { UserService } from './users/user-service';
import { UserController } from './users/user-controller';
import {createRoute}from './routes'
const knexConfig = require('../knexfile');
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"])
export const userService = new UserService(knex)
const userController = new UserController(userService)
const routes = createRoute(userController);
const app = express()
app.use(cors({
  origin: [process.env.REACT_HOST!]
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(routes)

const port = process.env.port || 8000

app.listen(port, () => {
  console.log('Listening on port ' + port)
})
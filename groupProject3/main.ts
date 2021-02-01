import Knex from 'knex'
import { createApp } from './server'

const knexConfig = require('./knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV ?? 'development'])

const app = createApp(knex)
app.listen(process.env.PORT ?? 8080, () => {
    console.log(`Listening at http://localhost:${process.env.PORT ?? 8080}`)
})
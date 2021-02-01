import { Client } from 'pg'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve(__dirname, '.env')});

export const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});
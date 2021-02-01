import express from 'express'
import { login } from './controllers/authController'

export const routes = express.Router();

export class Router {
    public static Initialize() {
        routes.post('/login', authController.login)
    }
}
import express from "express";
import { StockController } from "./stocks/stock-controller";
import { isLoggedIn } from "./users/guards";
import { UserController } from "./users/user-controller";
export function createRoute(userController: UserController,stockController:StockController) {
    const routes = express.Router();
    routes.post('/login',userController.logIn)
    routes.post('/register',userController.signUp)
    routes.get('/getAccountBalance',isLoggedIn,userController.showUserAccountBalance)
    routes.post('/search',stockController.StockSearch)
    routes.get('/selfProfilePage',isLoggedIn)  //not finish
    routes.get('/getTheUsername',isLoggedIn,userController.getTheUser)
    routes.get('/homepageInfo',stockController.ShowStockInfo)
    routes.post('/changeForWatchList',isLoggedIn,stockController.ActionToWatchList)
    routes.post('/addStockTradingInstruction',isLoggedIn,stockController.writeStockTransactionInstruction)
    routes.post('/stockTransaction',isLoggedIn,stockController.StockTransaction)

    return routes
}

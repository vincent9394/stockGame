import express from "express";
import { isLoggedIn } from "./guards";
import { UserController } from "./users/user-controller";
export function createRoute(userController: UserController) {
    const routes = express.Router();
    routes.get('/',isLoggedIn,userController.signUp)
    return routes
}

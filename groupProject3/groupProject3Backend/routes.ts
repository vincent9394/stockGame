import express from "express";
import { isLoggedIn } from "./guards";
import { UserController } from "./users/user-controller";
export function createRoute(userController: UserController) {
    const routes = express.Router();
    routes.post('/login',userController.logIn)
    routes.post('/register',userController.signUp)
    routes.get('/selfProfilePage',isLoggedIn)

    return routes
}

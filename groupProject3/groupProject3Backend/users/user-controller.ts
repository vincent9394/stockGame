import { Request, Response } from 'express';
import { UserService } from './user-service';
import jwtSimple from 'jwt-simple';
import jwt from './jwt';
import { checkPassword, isEmail } from './hash';

export class UserController {

    constructor(private userService: UserService) { }

    logIn = async (req: Request, res: Response) => {
        try {
            if (!req.body.username || !req.body.password) {
                res.status(401).json({  
                    result:false,
                    msg: "Wrong Username/Password"});
                return;
            }
            const { username, password } = req.body;
            const user = (await this.userService.getUserByUsername(username))[0];
            if (!user || !(await checkPassword(password, user.password))) {
                res.status(401).json({ 
                    result:false,
                    msg: "Wrong Username/Password" 
                });
                return;
            }
            const payload = {
                id: user.id,
                username: user.name
            };
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            res.status(200).json({
                result:true,
                AccountBalance:user.cash_in_hand,
                token: token
            });
        } catch (e) {
            console.log(e)
            res.status(500).json({ 
                result:false,
                msg: e.toString() ,
            })
        }
    }

    signUp = async (req: Request, res: Response) => {
        let { username, email, password } = req.body
        if (!username || !email || !password) {
            res.status(401).json({ 
                result:false,
                msg: "Please fill in all blanks"
             });
            return
        }
        if ((isEmail(email)) === false) {
            res.status(401).json({ 
                result:false,
                msg: "Please enter a valid email address" 
            });
            return
        }
        try {
            let user = await this.userService.signUp({ username, email, password })
            const payload = {
                id: user[0].id,
                username: username
            };
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            res.status(200).json({
                result:true,
                AccountBalance:user[0].cash_in_hand,
                token: token,
            });
        } catch (e) {
            res.status(500).json({ 
                result:false,
                msg: e.toString() })
        }
    }
    showUserAccountBalance = async (req: Request, res: Response) => {
       if(req.user){
        let  AccountBalance=(await this.userService.getAccountBalance(req.user.id))[0].cash_in_hand //userID suppose get by token
        res.status(200).json({
            result:true,
            AccountBalance:AccountBalance,
        })
    }else{
        res.status(401).json({
            result:false,
            msg:"Unauthorized"
        })
    }
    }
    getTheUser = async (req: Request, res: Response) => {
        if(req.user){
            const user=await this.userService.getUser(req.user.id)
         res.status(200).json({
             result:true,
             AccountBalance:user[0].cash_in_hand,
             username:user[0].name,
         })
     }else{
         res.status(401).json({
             result:false,
             msg:"Unauthorized"
            })
     }
     }
}
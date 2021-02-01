import {Request,Response} from 'express';
import { UserService } from './user-service';
import jwtSimple from 'jwt-simple';
import jwt from '../jwt';
import { checkPassword} from '../hash';
//import fetch from 'node-fetch';

export class UserController{

    constructor(private userService:UserService){}

    post = async (req:Request,res:Response)=>{
        try{
            if (!req.body.username || !req.body.password) {
                res.status(401).json({msg:"Wrong Username/Password"});
                return;
            }
            const {username,password} = req.body;
            const user = (await this.userService.getUser(username))[0];
            if(!user || !(await checkPassword(password,user.password))){
                res.status(401).json({msg:"Wrong Username/Password"});
                return;
            }
            const payload = {
                id: user.id,
                username: user.username
            };
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            res.json({
                token: token
            });
        }catch(e){
            console.log(e)
            res.status(500).json({msg:e.toString()})
        }
    }
}
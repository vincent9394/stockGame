import { UserController } from '../users/user-controller'
import { UserService } from '../users/user-service'
import { Request, Response } from 'express'
import * as Knex from 'knex';
//import { timeConvert } from './timeConvertFunction';
jest.mock('express')
describe("User Controller",()=>{
    let userController: UserController;
    let req: Request;
    let res: Response;
    //let resJson:jest.SpyInstance;
    let userService: UserService;
    beforeEach(function () {
        userService = new UserService({} as Knex);
        req = {
            body: {},
            file: {},
            params: {},
        } as any as Request
        userController = new UserController(userService)
        res = {
            status: jest.fn().mockReturnThis(),
            json:jest.fn() 
        } as any as Response;
    });

    it('will return json  if there are no username during login', async () => {
        req.body={
            password:'123',
    }
       await userController.logIn(req,res)
       expect(res.status).toBeCalledWith(401)
       expect(res.json).toBe({msg:"Wrong Username/Password"})

    })
    it('will return json  if there are no password during login', async () => {
        req.body={
            username:'Jack',
    }
    const getUserSpy = jest.spyOn(userService, 'getUser')
    getUserSpy.mockReturnValue([{ username: '20' }] as any)
        await userController.logIn(req,res)
       expect(res.status).toBeCalledWith(401)
       expect(res.json).toBe({msg:"Wrong Username/Password"})
    })
    it('can handle login successfully', async () => {
        req.body={
            username:'Jack',
            password:'123'
            }
            const getUserSpy = jest.spyOn(userService, 'getUser')
            getUserSpy.mockReturnValue([{ username: 'Jack',password:'123' }] as any)
    await userController.logIn(req,res)              //can check with token and hash
    expect(res.status).toBeCalledWith(200)


    })



})
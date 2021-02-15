import { UserController } from '../users/user-controller'
import { UserService } from '../users/user-service'
import { Request, Response } from 'express'
import * as Knex from 'knex';
import { checkPassword, isEmail } from '../users/hash';
jest.mock('../users/hash')
jest.mock('express')
describe("User Controller",()=>{
    let userController: UserController;
    let req: Request;
    let res: Response;
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
       expect(res.json).toBeCalledWith({ 
        result:false,
        msg: "Wrong Username/Password" 
    })

    })
    it('will return json  if there are no password during login', async () => {
        req.body={
            username:'Jack',
    }
    const getUserSpy = jest.spyOn(userService, 'getUser')
    getUserSpy.mockReturnValue([{ id:1,username: 'Jack',password:'123' }] as any)
        await userController.logIn(req,res)
       expect(res.status).toBeCalledWith(401)
       expect(res.json).toBeCalledWith({ 
        result:false,
        msg: "Wrong Username/Password" 
    })
    })
    it('can handle login successfully', async () => {
        req.body={
            username:'Jack',
            password:'123'
            }
            const getUserSpy = jest.spyOn(userService, 'getUserByUsername')
            getUserSpy.mockReturnValue([{ id:1,name: 'Jack',password:'123'}]as any);
            (checkPassword as jest.Mock).mockReturnValue(true)
    await userController.logIn(req,res)              //can check with token and hash
    expect(res.status).toBeCalledWith(200)
   // expect(res.json).toHaveProperty('token')


    })
    it('can show userAccount Balance', async () => {
        req.user={
            id:1,
            name:'Jack',
            password:'123',
    }
    const getAccountBalanceSpy = jest.spyOn(userService, 'getAccountBalance')
    getAccountBalanceSpy.mockReturnValue([{ cash_in_hand:3000}]as any)
       await userController.showUserAccountBalance(req,res)
       expect(res.status).toBeCalledWith(200)
       expect(res.json).toBeCalledWith({
        result:true,
        AccountBalance:3000,
    })
    })

    it('can signUp correctly', async () => {
        req.body={
            username:'Jack',
            email:'abc',
            password:'123',
    };
    (isEmail as jest.Mock).mockReturnValue(true)
    const signUpSpy = jest.spyOn(userService, 'signUp')
    signUpSpy.mockReturnValue([{id:2}]as any)
       await userController.signUp(req,res)
       expect(res.status).toBeCalledWith(200)
      // expect(res.json).toHaveProperty('token')
    })
})
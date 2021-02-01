import {UserService} from './user-service'
import  Knex from 'knex'
const knexConfig=require('../knexfile')
const knex=Knex(knexConfig['test'])

describe('User Service integrated with database',()=>{
    let userService:UserService;
    beforeEach(async() => {
        userService = new UserService(knex)
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
    });
    it('usersInfo can be successfully get by login',async()=>{
        const user=await userService.getUser('Jack')
        expect(user).toHaveLength(1)
        expect(user[0].username).toEqual('Jack')
        expect(user[0].id).toEqual('1')
    })
    it('users can be successfully SignUp',async()=>{
        const newUserID=await userService.signUp({ username:'Jack',address:'Mong Kok',email:'abc@gmail.com',password:'334421'})
        expect(newUserID).toHaveLength(1)
        expect(newUserID[0]).toBe(1)
        const getUserInfo=await knex.select('*').from('users').where('id',newUserID[0])
        expect(getUserInfo).toHaveLength(1)
        expect(getUserInfo[0].id).toBe(1)
        expect(getUserInfo[0].username).toBe('Jack')
        expect(getUserInfo[0].address).toBe('Mong Kok')
        expect(getUserInfo[0].email).toBe('abc@gmail.com')
    })
    it("users can't register with duplicatedEmail",async()=>{
        const newUserID=await userService.signUp({ username:'Jack',address:'Mong Kok',email:'abc@gmail.com',password:'334421'})
        expect(newUserID).toThrowError("Email already registered")
        
    })
    it("users can't register with  duplicatedUsername",async()=>{
        const newUserID=await userService.signUp({ username:'Jack',address:'Mong Kok',email:'abc@gmail.com',password:'334421'})
        expect(newUserID).toThrowError("username already used")
    })
    afterAll( ()=>{
        knex.destroy();
    })


})
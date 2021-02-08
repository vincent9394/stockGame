import {UserService} from '../users/user-service'
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
        const user=await userService.getUserByUsername('alex')
        expect(user).toHaveLength(1)
        expect(user[0].name).toEqual('alex')
        expect(user[0].id).toEqual(1)
    })
    it('users can be successfully SignUp',async()=>{
        const newUser=await userService.signUp({ username:'Jack',email:'abc@gmail.com',password:'334421'})
        expect(newUser).toHaveLength(1)
        expect(newUser[0].id).toBe(7)
        expect(newUser[0].name).toBe('Jack')
        expect(newUser[0].email).toBe('abc@gmail.com')
    })
    it("users can't register with duplicatedEmail",async()=>{
       // const user=await userService.signUp({ username:'Jack',email:'alex@email.com',password:'334421'})
        expect(await userService.signUp({ username:'Jack',email:'alex@email.com',password:'334421'})).toBe("Email already registered")
        
    })
    it("users can't register with  duplicatedUsername",async()=>{
        //const user=await userService.signUp({ username:'gordon',email:'abc@gmail.com',password:'334421'})
        expect(await userService.signUp({ username:'gordon',email:'abc@gmail.com',password:'334421'})).toBe("username already used")
    })
    afterAll( ()=>{
        knex.destroy();
    })


})
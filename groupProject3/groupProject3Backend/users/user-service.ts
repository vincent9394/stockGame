
import * as Knex from 'knex';
import { hashPassword } from '../hash';

export class UserService {
    constructor(private knex:Knex){}
    async signUp(user: { username: string,address:string,email: string, password: string }) {
        try{
        let duplicatedEmail = await this.knex.select('id').from('users').where('email',user.email)
        if (duplicatedEmail.length > 0) {
            throw new Error("Email already registered")
          }
          let duplicatedUsername = await this.knex.select('id').from('users').where('username',user.username)
          if (duplicatedUsername.length> 0) {
            throw new Error("username already used")
          }
        let hash = await hashPassword(user.password)
        await this.knex('users').insert({
            username:user.username,
            address:user.address,
            email:user.email,
            password:hash,
        }).returning('id')
    }catch(e){
        throw new Error(e.toString())
    }
    }
    async getUser(username:string){ //sampleService for Login
        return await this.knex.select('username','password').from('users').where('username',username);
    }
}
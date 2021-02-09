
import * as Knex from 'knex';
import { hashPassword } from './hash';

export class UserService {
    constructor(private knex:Knex){}
    async signUp(user: { username: string,email: string, password: string }) {
        let duplicatedEmail = await this.knex.select('id').from('users').where('email',user.email)
        if (duplicatedEmail.length > 0) {
           throw  new Error("Email already registered")
          }
          let duplicatedUsername = await this.knex.select('id').from('users').where('name',user.username)
          if (duplicatedUsername.length> 0) {
           throw new Error("username already used")
          }
        let hash = await hashPassword(user.password)
        return await this.knex('users').insert({
            name:user.username,
            email:user.email,
            password:hash,
            cash_in_hand:100000,
        }).returning('*')
    }
    async getUser(id:number){ //sampleService for Login
        return await this.knex.select('*').from('users').where('id',id);
    }
    async getUserByUsername(username:string){ //sampleService for Login
        return await this.knex.select('*').from('users').where('name',username);
    }
   
    async getAccountBalance(userID:number){ //maybe trx problem
        return await this.knex.select('cash_in_hand').from('users').where('id',userID);
    }
    

}

import * as Knex from 'knex';
import { hashPassword } from '../hash';

export class UserService {
    constructor(private knex:Knex){}
    async signUp(user: { nickname: string, email: string, password: string }) {
        
        let duplicatedEmail = await this.knex.raw('select email from users where email = ?', [user.email])
        if (duplicatedEmail.rows.length > 0) {
            throw new Error("Email already registered")

        }
        let hash = await hashPassword(user.password)
        let id = await this.knex.raw('INSERT INTO users (nickname, email, password) VALUES (?,?,?) returning id',
            [user.nickname, user.email, hash]) //change last index from hash to user.password
        
        
        return id.rows[0].id

    }
    async getUser(id:number){
        return await this.knex.select('*').from('users').where('id',id)[0];
    }
}
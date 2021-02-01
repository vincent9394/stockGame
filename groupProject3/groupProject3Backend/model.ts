export interface IUser{
    id:number
    username:string
    password:string
}


declare global{
    namespace Express{
        interface Request{
            user?: IUser
        }
    }
}
export interface IUser{
    id:number
    name:string
    password:string
}


declare global{
    namespace Express{
        interface Request{
            user?: IUser
        }
    }
}
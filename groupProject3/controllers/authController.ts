import type express from 'express'

export class AuthController{
    public constructor(private authService: AuthService){}

    public login = async (req: express.Request, res: express.Response) => {
         
    }
}
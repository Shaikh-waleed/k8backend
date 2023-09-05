import { Request, Response } from 'express'
import AuthServices from '../services/authServices'
import { loginBody, signUpBody } from '../utils/interfaces'
import BaseController from './baseController'


export default class UserController extends BaseController {
    authServices: AuthServices
    constructor() {
        super()
        this.authServices = new AuthServices()
    }
    async login(req: Request, res: Response): Promise<void> {
        try {
            const reqData = this.getRequestData<loginBody>(req)
            const response = await this.authServices.login(reqData)
            res.set({ json: { 'Content-Type': 'application/json' } })
                .status(200)
                .send(JSON.stringify(response))
        } catch (err) {
            if (err instanceof Error) {
                res.set({ json: { 'Content-Type': 'application/json' } })
                    .status(400)
                    .send({
                        response: {
                            success: false,
                            error: err.message
                        }
                    })
            }
        }
    }

    async signUp(req: Request, res: Response): Promise<void> {
        try {
            const reqData = this.getRequestData<signUpBody>(req)
            const response = await this.authServices.signUp(reqData)
            res.set({ json: { 'Content-Type': 'application/json' } })
                .status(200)
                .send(JSON.stringify(response))
        } catch (err) {
            if (err instanceof Error) {
                res.set({ json: { 'Content-Type': 'application/json' } })
                    .status(400)
                    .send({
                        response: {
                            success: false,
                            error: err.message
                        }
                    })
            }
        }
    }
}
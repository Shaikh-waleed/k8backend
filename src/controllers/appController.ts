import { Request, Response } from 'express'
import AppServices from '../services/appServices'
import { reqTokenInterface } from '../utils/interfaces'


export default class PaymentController {
    appServices : AppServices
    constructor() {
        this.appServices = new AppServices()
    }
    
    async dashBoard(req: reqTokenInterface, res: Response): Promise<void> {
        try {
            res.set({ json: { 'Content-Type': 'application/json' } })
                .status(200)
                .send(JSON.stringify(req.user))
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
    async getProfile(req: reqTokenInterface, res: Response): Promise<void> {
        try {
            let user = null
            if(!req.user){
                throw new Error("Your Token is not Valid")
            }
            if(req.user){
                user = await this.appServices.getProfile(req.user.id)
            }
            res.set({ json: { 'Content-Type': 'application/json' } })
                .status(200)
                .send(JSON.stringify(user))
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
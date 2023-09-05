import { Response } from 'express'
import WebhookServices from '../services/webhookServices'


export default class PaymentController {
    services : WebhookServices
    constructor() {
        this.services = new WebhookServices()
    }
    
    async webhook(req: any, res: Response): Promise<void> {
        const response =  this.services.webhook(req.body,req.huz)
        try {
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
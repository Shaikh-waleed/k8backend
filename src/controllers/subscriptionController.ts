import { Request, Response } from 'express'
import AppServices from '../services/appServices'
import SubcriptionServices from '../services/subscriptionServices'
import { reqTokenInterface } from '../utils/interfaces'


export default class SubscriptionController {
    services: SubcriptionServices
    constructor() {
        this.services = new SubcriptionServices()
    }

    async getSubscriptions(req: reqTokenInterface, res: Response): Promise<void> {
        try {
            if (req.user?.id) {
                const subscriptions = await this.services.get(req.user.id)
                res.set({ json: { 'Content-Type': 'application/json' } })
                    .status(200)
                    .send(JSON.stringify(subscriptions))
            } else {
                throw new Error("Subscriptions is not available of this user")
            }
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
import { Request, Response } from 'express'
import User from '../models/userSchema'
import PaymentServices from '../services/paymentServices'
import BaseController from './baseController'


export default class PaymentController extends BaseController {
    paymentServices: PaymentServices
    constructor() {
        super()
        this.paymentServices = new PaymentServices()
    }

    async getPaymentDetails(req: any, res: Response): Promise<void> {
        try {
            let user: any = await User.findById(req.user.id);
            const query: any = (user.country === 'Canada') ? { countryID: "CAD" } : { countryID: "ALL" }
            const productDetails = await this.paymentServices.getPaymentDetails(query)
            res.set({ json: { 'Content-Type': 'application/json' } })
                .status(200)
                .send(JSON.stringify(productDetails))
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
    async setPaymentDetails(req: any, res: Response): Promise<void> {
        try {
            const reqData = this.getRequestData(req)
            const { id } = reqData.queryParams
            if (id) {
                const productDetails = await this.paymentServices.setPaymentDetails(id)
                res.set({ json: { 'Content-Type': 'application/json' } })
                    .status(200)
                    .send(JSON.stringify(productDetails))
            } else {
                throw new Error("Your Subscription ID is not Valid")
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
    async getPaymentVerification(req: any, res: Response): Promise<void> {
        try {
            const reqData = this.getRequestData(req)
            const { id } = reqData.queryParams
            if (id && req.user.id) {
                const productDetails = await this.paymentServices.getPaymentVerification(id,req.user.id)
                res.set({ json: { 'Content-Type': 'application/json' } })
                    .status(200)
                    .send(JSON.stringify(productDetails))
            } else {
                throw new Error("Your Subscription ID is not Valid")
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
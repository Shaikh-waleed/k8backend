import UserController from '../controllers/authControllers'
import express, { NextFunction, Request, Response } from 'express'
import { Router } from '../utils/interfaces'
import { userSignInValidation, userSignUpValidation } from '../utils/reqValidations'
import Validator from '../utils/reqValidator'
import AppController from '../controllers/appController'
import Authentication from '../middlewares/authenticate'
import PaymentController from '../controllers/paymentController'
export class PaymentRouter implements Router {
    app: express.Application
    paymentController: PaymentController
    auth:Authentication
    constructor(app: express.Application) {
        this.app = app
        this.paymentController = new PaymentController()
        this.auth = new Authentication()
        this.setRoutes()
    }
    setRoutes() {
        this.app.get('/getpaymentdetails',
            (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
            (req: Request, res: Response) => this.paymentController.getPaymentDetails(req, res)
        )
        this.app.post('/PaymentDetails/:id',
            (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
            (req: Request, res: Response) => this.paymentController.setPaymentDetails(req, res)
        )
        this.app.get('/getpaymentverification/:id',
            (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
            (req: Request, res: Response) => this.paymentController.getPaymentVerification(req, res)
        )
    }
}   
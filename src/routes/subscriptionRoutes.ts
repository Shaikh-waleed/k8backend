import express, { NextFunction, Request, Response } from 'express'
import { Router } from '../utils/interfaces'
import Authentication from '../middlewares/authenticate'
import SubscriptionController from '../controllers/subscriptionController'
export class SubscriptionRouter implements Router {
    app: express.Application
    controller: SubscriptionController
    auth:Authentication
    constructor(app: express.Application) {
        this.app = app
        this.controller = new SubscriptionController()
        this.auth = new Authentication()
        this.setRoutes()
    }
    setRoutes() {
        this.app.get('/subscriptions',
            (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
            (req: Request, res: Response) => this.controller.getSubscriptions(req, res)
        )
    }
}   
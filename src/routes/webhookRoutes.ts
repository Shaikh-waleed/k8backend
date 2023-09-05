import express, { NextFunction, Request, Response } from 'express'
import { Router } from '../utils/interfaces'
import WebhookController from '../controllers/webhookController'
import WebhookSignValidate from '../middlewares/webhookSignValidate'
export class WebhookRouter implements Router {
    app: express.Application
    webhookController: WebhookController
    validator: WebhookSignValidate
    constructor(app: express.Application) {
        this.app = app
        this.webhookController = new WebhookController()
        this.validator = new WebhookSignValidate()
        this.setRoutes()
    }
    setRoutes() {
        this.app.post('/webhook',
            (req: Request, res: Response, next: NextFunction) => this.validator.validate(req, res, next),
            (req: Request, res: Response) => this.webhookController.webhook(req, res)
        )
    }
}   
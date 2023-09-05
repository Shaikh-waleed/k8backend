import UserController from '../controllers/authControllers'
import express, { NextFunction, Request, Response } from 'express'
import { Router } from '../utils/interfaces'
import { userSignInValidation, userSignUpValidation } from '../utils/reqValidations'
import Validator from '../utils/reqValidator'
import AppController from '../controllers/appController'
import Authentication from '../middlewares/authenticate'
export class AppRouter implements Router {
    app: express.Application
    appController: AppController
    auth:Authentication
    constructor(app: express.Application) {
        this.app = app
        this.appController = new AppController()
        this.auth = new Authentication()
        this.setRoutes()
    }
    setRoutes() {
        this.app.get('/',
            (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
            (req: Request, res: Response) => this.appController.dashBoard(req, res)
        )
        this.app.get('/getprofile',
            (req: Request, res: Response, next: NextFunction) => this.auth.authenticate(req, res, next),
            (req: Request, res: Response) => this.appController.getProfile(req, res)
        )
    }
}   
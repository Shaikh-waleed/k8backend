import UserController from '../controllers/authControllers'
import express, { NextFunction, Request, Response } from 'express'
import { Router } from '../utils/interfaces'
import { userSignInValidation, userSignUpValidation } from '../utils/reqValidations'
import Validator from '../utils/reqValidator'
export class AuthRouter implements Router {
    app: express.Application
    userController: UserController
    validator: Validator
    constructor(app: express.Application) {
        this.app = app
        this.userController = new UserController()
        this.validator = new Validator()
        this.setRoutes()
    }
    setRoutes() {
        this.app.post('/login',
            userSignInValidation(),
            (req: Request, res: Response, next: NextFunction) => this.validator.validate(req, res, next),
            (req: Request, res: Response) => this.userController.login(req, res)
        )
        this.app.post('/signup',
            userSignUpValidation(),
            (req: Request, res: Response, next: NextFunction) => this.validator.validate(req, res, next),
            (req: express.Request, res: express.Response) => this.userController.signUp(req, res)
        )
    }
}   
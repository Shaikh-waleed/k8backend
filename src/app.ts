import express, { NextFunction, Request, Response } from 'express'
import { AuthRouter } from './routes/authRoutes'
// import expressWinston from 'express-winston'
import helmet from 'helmet'
// import winston from 'winston'
import bodyParser from 'body-parser'
import cors from 'cors'
import Authentication from './middlewares/authenticate'
import { reqTokenInterface } from './utils/interfaces'
import { AppRouter } from './routes/appRoutes'
import compression from 'compression'
import { PaymentRouter } from './routes/paymentRoutes'
import { CloudProfileRouter } from './routes/cloudProfileRoutes'
import { WebhookRouter } from './routes/webhookRoutes'
import { SubscriptionRouter } from './routes/subscriptionRoutes'
import { ClusterRouter } from './routes/clusterRoutes'

// import ServiceContainer from './service-container'
// import { UserRouter } from './user/user-router'

export class App {
    instance: express.Application
    auth: Authentication

    constructor() {
        this.instance = express()
        this.auth = new Authentication()
    }

    private setRoutes(): void {
        const userRouter = new AuthRouter(this.instance)
        const appRouter = new AppRouter(this.instance)
        const paymentRouter = new PaymentRouter(this.instance)
        const cloudProfileRouter = new CloudProfileRouter(this.instance)
        const webhookRouter = new WebhookRouter(this.instance)
        const subscriptionRouter = new SubscriptionRouter(this.instance)
        const clusterRouter = new ClusterRouter(this.instance)
    }

    configureApp(): void {
        this.instance.use(helmet())
        this.instance.use(compression())
        this.instance.use(cors<Request>())
        this.instance.use(express.json());
        this.instance.use(express.urlencoded({
            extended: true
        })); this.instance.use(bodyParser.json())
        this.instance.use(bodyParser.urlencoded({ extended: true }))
        // this.instance.use(expressWinston.logger({
        //   transports: [
        //       new winston.transports.Console()
        //   ],
        //   format: winston.format.combine(
        //       winston.format.colorize(),
        //       winston.format.json()
        //   )
        // }))
        this.setRoutes()
        // this.instance.use(expressWinston.errorLogger({
        //   transports: [
        //       new winston.transports.Console()
        //   ],
        //   format: winston.format.combine(
        //       winston.format.colorize(),
        //       winston.format.json()
        //   )
        // }))
    }
}

export default App

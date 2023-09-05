import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default class Authentication {
    authenticate(req: any, res: Response, next: NextFunction) {
        const token: string = req.header('auth_token');
        if (!token) {
            res
                .status(401)
                .send({
                    success: false,
                    error: "Please authenticate using a valid token"
                })
        }
        try {
            const secretKey: string = process.env.SECRET_KEY || ''
            const data: any = jwt.verify(token, secretKey);
            if (data !== String) {
                req.user = data.user
            }
            if (req.user) {
                next();
            }
        } catch (error) {
            res
                .status(401)
                .send({
                    success: false,
                    error: "Please authenticate using a valid token"
                })
        }
    }
}

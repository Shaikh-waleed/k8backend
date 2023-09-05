import { Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userSchema";
import crypto from "../utils/crypto";
import { loginBody, RequestData, signUpBody } from "../utils/interfaces";


export default class AuthServices {
    crypto: crypto
    constructor() {
        this.crypto = new crypto()
    }

    async login(request: RequestData<loginBody>): Promise<any> {
        const { body } = request
        const { email, password } = body
        let user: any = await User.findOne({ email });
        const isUser: Boolean = await this.crypto.validate(password, user?.password)
        if (!isUser) {
            throw new Error("Please try to login with correct credentials")
        }
        const secretKey: string = process.env.SECRET_KEY || ''
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(
            data,
            secretKey,
            { expiresIn: '1h' }
        );
        return {
            fullName: user.fullName,
            email: user.email,
            success: true,
            country: user.country,
            authToken
        }
    }

    async signUp(request: RequestData<signUpBody>): Promise<any> {
        const { fullName, email, password, country } = request.body
        let hashedPassword = await this.crypto.hash(password)
        const userObj = new User({
            fullName,
            email,
            password: hashedPassword,
            country
        })
        const user = await userObj.save()
        const secretKey: string = process.env.SECRET_KEY || ''
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(
            data,
            secretKey,
            { expiresIn: '1h' }
        );
        return {
            fullName: user.fullName,
            email: user.email,
            country: user.country,
            success: true,
            authToken
        }
    }
}
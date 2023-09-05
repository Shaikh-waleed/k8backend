import { validationResult } from "express-validator"
import { NextFunction, Response, Request } from 'express'

export default class Validator {
    validate(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        const extracterErrors : any = []
        errors
            .array()
            .map((err) => {
                extracterErrors.push({ [err.param]: err.msg })
            })
        return res.status(402).json({
            errors: extracterErrors
        });
    }
}
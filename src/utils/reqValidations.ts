import { body, ValidationChain } from "express-validator"

type Validation = () => ValidationChain[]

export const userSignUpValidation : Validation = () => {
    return ([
        body('fullName', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }).matches(/\d/).withMessage('must contain a number'),
        body('country', 'Select a country')
    ])
}
export const userSignInValidation : Validation = () => {
    return ([
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    ])
}
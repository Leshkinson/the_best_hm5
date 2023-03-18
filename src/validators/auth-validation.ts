import {body} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const checkIsValidUser = async (req: Request, res: Response, next: NextFunction) =>{
    next()
}
const loginOrEmailValidation = body('loginOrEmail')
    .isString().withMessage('Invalid type')
    .trim()
    .isLength({min: 1, max: 25}).withMessage('Not correct length')
    .notEmpty().withMessage('Field must not be empty')

const passwordValidation = body('password')
    .isString().withMessage('Invalid type')
    .trim()
    .isLength({min: 1, max: 25}).withMessage('Not correct length')
    .notEmpty().withMessage('Field must not be empty')




export const authValidation = [loginOrEmailValidation, passwordValidation]
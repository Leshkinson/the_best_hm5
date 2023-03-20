import {body} from "express-validator";
import {NextFunction, Request, Response} from "express";
import {userService} from "../services/user-service";
import bcrypt from "bcrypt";

export const checkIsValidUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.getUserByLoginOrEmail(req.body.loginOrEmail)
    if (!user) {
        res.sendStatus(401)
        return
    }
    const hash = await bcrypt.hash(req.body.password, user.salt)
    if (hash !== user.hash) {
        res.sendStatus(401)
        return
    }
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
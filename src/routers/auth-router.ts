import {Router} from "express";
import {authController} from "../controllers/auth-controller";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";
import {authValidation, checkIsValidUser} from "../validators/auth-validation";

export const authRouter = Router({})

//-------------------POST---------------//
authRouter.post('/', authValidation, checkIsValidUser, inputValidationMiddleware, authController.authorization)
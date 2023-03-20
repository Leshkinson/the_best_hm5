import {Router} from "express";
import {userController} from "../controllers/user-controller";


export const userRouter = Router({})

//-------------------GET---------------//
userRouter.get('/', userController.getAllUsers)
//-------------------POST---------------//
userRouter.post('/', userController.createUser)
//-------------------DELETE---------------//
import {Router} from "express";
import {checkPostId, postValidations} from "../validator/validators";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";
import {authorizationGuard} from "../middleware/authorization-guard";
import {postController} from "../controllers/post-controller";



export const postsRouter = Router({})

//-------------------GET---------------//
postsRouter.get('/', postController.getAllPost)
postsRouter.get('/:id', postController.getPostById)
//-------------------POST---------------//
postsRouter.post('/', authorizationGuard, postValidations, inputValidationMiddleware,postController.createPost)
//-------------------PUT---------------//
postsRouter.put('/:id', authorizationGuard,checkPostId, postValidations, inputValidationMiddleware, postController.changePost)
//-------------------DELETE---------------//
postsRouter.delete('/:id', authorizationGuard, postController.deletePost)

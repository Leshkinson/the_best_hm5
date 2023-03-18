import {Request, Response, Router} from "express";
import {postRepository} from "../repositories/post-repository";
import {HTTP_STATUSES} from "../http_statuses";
import {blogRepository} from "../repositories/blog-repository";

export const testingRouter = Router({})

    testingRouter.delete('/all-data', (req: Request, res: Response) => {
        blogRepository.deleteAllBlogs()
        postRepository.deleteAllPosts()
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })
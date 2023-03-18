import {NextFunction, Request, Response} from "express";
import {HTTP_STATUSES} from "../http_statuses";
import {blogService} from "../services/blog-service";
import {postService} from "../services/post-service";


export const checkBlogId = async (req: Request, res: Response, next: NextFunction) =>{
    const isHaveBlog = await blogService.getBlogById(req.params.id)
    if(!isHaveBlog){
       res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    next()
}

export const checkPostId = async (req: Request, res: Response, next: NextFunction) =>{
    const isHaveId = await postService.getPostById(req.params.id)
    isHaveId ? next() :  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
}


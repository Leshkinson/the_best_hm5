import {Request, Response} from "express";
import {HTTP_STATUSES} from "../http_statuses";


export const authController = {

   async authorization(req: Request, res: Response){
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }

}
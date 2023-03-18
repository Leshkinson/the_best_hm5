import {Request, Response} from "express";
import {DefaultValueListType} from "../types";
import {HTTP_STATUSES} from "../http_statuses";
import {userService} from "../services/user-service";

const DEFAULT_VALUE_LIST: DefaultValueListType = {
    FIELD_FOR_SORT: "createdAt",
    SORT_DIRECTION: "desc",
    PAGE_NUMBER: 1,
    PAGE_SIZE: 10
}

export const userController = {

    async getAllUsers(req: Request, res: Response) {
        const query = {
            pageNumber: Number(req.query.pageNumber || DEFAULT_VALUE_LIST.PAGE_NUMBER),
            pageSize: Number(req.query.pageSize || DEFAULT_VALUE_LIST.PAGE_SIZE),
            sortBy: req.query.sortBy as string || DEFAULT_VALUE_LIST.FIELD_FOR_SORT,
            searchNameTerm: req.query.searchNameTerm as string || "",
            sortDirection: req.query.sortDirection as string || DEFAULT_VALUE_LIST.SORT_DIRECTION
        }
        const users = await userService.getAllUsers(query)
        res.status(HTTP_STATUSES.OK200).send(users)
    },

    async createUser(req: Request, res: Response) {
        const newUser = await userService.createUser(req.body)
        res.status(HTTP_STATUSES.CREATED_201).send(newUser)
    }

}
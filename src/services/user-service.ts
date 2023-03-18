import {
    QueryForBlogsType,
    ResponseTypeWithPages,
    UserRequestType,
    UserResponseFromDBType,
    UserResponseType
} from "../types";
import {getSortSkipLimit} from "../utils/getSortSkipLimit";
import {userRepository} from "../repositories/user-repositpry";
import {createId} from "../utils/createId";
import bcrypt from "bcrypt";
import {userModels} from "../models/user-models";
import {Sort} from "mongodb";

export const userService = {

    async getAllUsers(query: QueryForBlogsType):Promise<ResponseTypeWithPages<UserResponseType>> {
        const {pageNumber, pageSize} = query
        const [sort, skip, limit] = await getSortSkipLimit(query)
        const filter: any = {}
        const totalCount = await userRepository.getTotalCount(filter)
        const users = await userRepository.getAllUsers(filter, sort as Sort, +skip, +limit)
        return {
            pagesCount: Math.ceil(totalCount / +pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount,
            items: userModels(users) as UserResponseType[]
        }
    },

    async createUser(user: UserRequestType):Promise<UserResponseType> {
        const id = createId()
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(id, salt)
        const newUser:UserResponseType = {
            id,
            login: user.login,
            email: user.email,
            createdAt: new Date().toISOString(),
        }
        await userRepository.createUser({...newUser, hash} as UserResponseFromDBType)
        return newUser
    }
}
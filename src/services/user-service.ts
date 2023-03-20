import {
    QueryForUsersType,
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
import {getRegexFilter} from "../utils/getRegexFilter";




export const userService = {

    async getAllUsers(query: QueryForUsersType): Promise<ResponseTypeWithPages<UserResponseType>> {
        const {pageNumber, pageSize} = query
        const [sort, skip, limit] = await getSortSkipLimit(query)
        const filter: any = getRegexFilter({email: query.searchEmailTerm, login: query.searchLoginTerm}, true)
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

    async getUserByLoginOrEmail(loginOrEmail: string): Promise<UserResponseFromDBType | null> {
        const filter: any = {
            $or: [{login: loginOrEmail}, {email: loginOrEmail}]
        }
        return await userRepository.getUserByLoginOrEmail(filter)
    },

    async createUser(user: UserRequestType): Promise<UserResponseType> {
        const id = createId()
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        const newUser: UserResponseType = {
            id,
            login: user.login,
            email: user.email,
            createdAt: new Date().toISOString(),
        }
        await userRepository.createUser({...newUser, hash, salt} as UserResponseFromDBType)
        return newUser
    },

    async deleteUser(id: string): Promise<boolean> {
        const filter = {id}
        return await userRepository.deleteUser(filter)
    }
}
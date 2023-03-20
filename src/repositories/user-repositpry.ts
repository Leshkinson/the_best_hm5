import {userCollections} from "../../mongoDB";
import {UserResponseFromDBType} from "../types";


export const userRepository = {

    async getAllUsers(filter: any, sort: any, skip: any, limit: any): Promise<UserResponseFromDBType[]> {
        return await userCollections.find(filter).sort(sort).skip(skip).limit(limit).toArray()
    },

    async getUserByLoginOrEmail(filter:any): Promise<UserResponseFromDBType|null>{
        return await userCollections.findOne(filter)
    },

    async getTotalCount(filter: any): Promise<number> {
        return await userCollections.countDocuments(filter)
    },

    async createUser(newUser: any): Promise<void> {
        await userCollections.insertOne(newUser)
    }
}
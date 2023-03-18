import {userCollections} from "../../mongoDB";
import {UserResponseFromDBType} from "../types";


export const userRepository = {

    async getAllUsers(filter: any, sort: any, skip: any, limit: any):Promise<UserResponseFromDBType[]>{
        return await userCollections.find(filter).sort(sort).skip(skip).limit(limit).toArray()
    },

    async getTotalCount(filter: any){
        return await userCollections.countDocuments(filter)
    },

    async createUser(newUser: any):Promise<void>{
        await userCollections.insertOne(newUser)
    }
}
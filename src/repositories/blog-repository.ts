import {BlogResponseType} from "../types";
import {blogCollections} from "../../mongoDB";

export const blogRepository = {

    async getAllBlogs(filter: any, sort: any, skip: any, limit: any): Promise<BlogResponseType[]> {
        return await blogCollections.find(filter).sort(sort).skip(skip).limit(limit).toArray()
    },

    async getBlogById(id: { id: string }): Promise<BlogResponseType | null> {
        return blogCollections.findOne(id)
    },

    async getTotalCount(filter: any):Promise<number> {
        return await blogCollections.countDocuments(filter)
    },

    async createBlog(newBlog: BlogResponseType): Promise<void> {
        await blogCollections.insertOne(newBlog)
    },

    async changeBlog(id: { id: string }, updateBLog: { $set: BlogResponseType }): Promise<boolean> {
        const result = await blogCollections.updateOne(id, updateBLog)
        return result.matchedCount === 1;

    },

    async deleteBlog(id: { id: string }): Promise<boolean> {
        const result = await blogCollections.deleteOne(id)
        return result.deletedCount === 1
    },

    async deleteAllBlogs():Promise<void> {
        await blogCollections.deleteMany({})
    }
}
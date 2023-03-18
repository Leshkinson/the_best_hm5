import {postRepository} from "../repositories/post-repository";
import {DefaultValueListType, PostResponseType, QueryForBlogsType} from "../types";
import {blogService} from "./blog-service";
import {getSortSkipLimit} from "../utils/getSortSkipLimit";

const DEFAULT_VALUE_LIST: DefaultValueListType = {
    FIELD_FOR_SORT: "createdAt",
    SORT_DIRECTION: "desc",
    PAGE_NUMBER: 1,
    PAGE_SIZE: 10
}


export const postService = {
    async getAllPosts(query: QueryForBlogsType) {
        const  {pageNumber, pageSize}  = query
        const filter: any = {}
        const totalCount = await postRepository.getTotalCount(filter)
        const [sort, skip, limit ] = await getSortSkipLimit(query)
        return {
            pagesCount: Math.ceil(totalCount / +pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount,
            items: await postRepository.getAllPosts(filter, sort, skip, +limit)
        }
    },
    async getPostById(id: string): Promise<PostResponseType | null> {
        const filter = {id: id}
        return await postRepository.getPostById(filter)
    },
    async createPost(post: PostResponseType) {
        const findBlog = await blogService.getBlogById(post.blogId)
        const newPost = {
            id: (+(new Date())).toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            //@ts-ignore
            blogName: findBlog.name,
            createdAt: new Date().toISOString()
        }
        await postRepository.createPost(newPost)
        return newPost
    },
    async changePost(id:string, post: PostResponseType) {
        const {title, blogId, content, shortDescription} = post
        const findBlog = await blogService.getBlogById(post.blogId)
        const filter = {id}
        const update = {
            $set: {
                title,
                blogId,
                //@ts-ignore
                blogName: findBlog.name,
                content,
                shortDescription
            }
        } as {$set : PostResponseType}
        return await postRepository.changePost(filter, update)
    },
   async deletePost(id: string):Promise<boolean>{
        return await postRepository.deletePost(id)
    }
}
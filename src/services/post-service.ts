import {postRepository} from "../repositories/post-repository";
import {PostRequestType, PostResponseType, QueryForBlogsType, ResponseTypeWithPages} from "../types";
import {blogService} from "./blog-service";
import {getSortSkipLimit} from "../utils/getSortSkipLimit";
import {postModels} from "../models/post-models";


export const postService = {
    async getAllPosts(query: QueryForBlogsType):Promise<ResponseTypeWithPages<PostResponseType>> {
        const {pageNumber, pageSize} = query
        const filter: any = {}
        const totalCount = await postRepository.getTotalCount(filter)
        const [sort, skip, limit] = await getSortSkipLimit(query)
        const posts = await postRepository.getAllPosts(filter, sort, skip, +limit)
        return {
            pagesCount: Math.ceil(totalCount / +pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount,
            items: postModels(posts) as PostResponseType[]
        }
    },

    async getPostById(id: string): Promise<PostResponseType | null> {
        const filter = {id: id}
        const post = await postRepository.getPostById(filter)
        if (post) {
            return postModels(post) as PostResponseType
        }
        return null
    },

    async createPost(post: PostRequestType): Promise<PostResponseType> {
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
        return postModels(newPost) as PostResponseType
    },

    async changePost(id: string, post: PostResponseType):Promise<boolean> {
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
        } as { $set: PostResponseType }
        return await postRepository.changePost(filter, update)
    },

    async deletePost(id: string): Promise<boolean> {
        return await postRepository.deletePost(id)
    }
}
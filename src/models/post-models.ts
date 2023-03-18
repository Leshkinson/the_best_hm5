import {PostResponseType} from "../types";


export const postModels = (posts: any): any => {
    const postConverter = (post:PostResponseType) => {
        return {
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }
    }

    if (Array.isArray(posts.items)){
        return {...posts, items: posts.items.map((ps: PostResponseType) => postConverter(ps))}
    }
    return postConverter(posts)
}
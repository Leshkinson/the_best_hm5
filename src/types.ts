export type BlogType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    isMembership: boolean
    createdAt: string
}

export type InitPostType = {
    title: string,
    shortDescription: string,
    content: string
}
export type UserType = {
    id: string,
    login: string,
    email: string,
    createdAt: string
}

export type PostType = InitPostType & {
    id: string
    blogId: string
    blogName: string
    createdAt: string
}

export type QueryForBlogsType = {
    pageNumber : number
    pageSize: number
    sortBy: string
    sortDirection: string
    searchNameTerm: string
}

export type DefaultValueListType = {
    FIELD_FOR_SORT : string
    SORT_DIRECTION : string
    PAGE_NUMBER : number
    PAGE_SIZE : number
}

export type ResponseTypeWithPages<I> = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: I[]
}

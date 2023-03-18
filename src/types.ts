export type UserType = {
    login: string,
    email: string
}

export type UserRequestType = UserType & {
    password: string
}

export type UserResponseType = UserType & {
    id: string,
    createdAt: string
}

export type UserResponseFromDBType = UserResponseType & {
    hash: string
}

export type InitPostType = {
    title: string,
    shortDescription: string,
    content: string
}

export type PostRequestType = InitPostType & {
    blogId: string
}

export type PostResponseType = InitPostType & {
    id: string
    blogId: string
    blogName: string
    createdAt: string
}



export type BlogType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    isMembership: boolean
    createdAt: string
}








export type QueryForBlogsType = {
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: string
    searchNameTerm: string
}

export type DefaultValueListType = {
    FIELD_FOR_SORT: string
    SORT_DIRECTION: string
    PAGE_NUMBER: number
    PAGE_SIZE: number
}

export type ResponseTypeWithPages<I> = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: I[]
}

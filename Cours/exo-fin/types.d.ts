export interface NewPost {
    title: string,
    author: string,
    description: string,
    date: Date,
    img: string,
    likes: number
}

export interface Post extends NewPost {
    _id: string
}
export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface ReactionCounts {
    likes: number;
    dislikes: number;
    favorite: boolean;
}


export interface Post {
        id: number;
        title: string;
        body: string;
        image?: string;
        author?: string;
        date?: string;
        likes?: number;
        dislikes?: number;
    }
export interface ReactionCounts {
    likes: number;
    dislikes: number;
    favorite: boolean;
    userReaction: 'like' | 'dislike' | null;
}


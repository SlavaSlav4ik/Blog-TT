import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadReactions, saveReactions } from '../../utils/storage';
import { ReactionCounts } from '../../types';

export type ReactionsState = Record<number, ReactionCounts>;

const persisted = loadReactions() || {};

const initialState: ReactionsState = { ...persisted };

const reactionsSlice = createSlice({
    name: 'reactions',
    initialState,
    reducers: {
        initPostReactions(state, action: PayloadAction<number>) {
            const id = action.payload;
            if (!state[id]) {
                state[id] = {
                    likes: Math.floor(Math.random() * 51),
                    dislikes: Math.floor(Math.random() * 51),
                    favorite: false,
                    userReaction: null,
                };
            }
        },

        like(state, action: PayloadAction<number>) {
            const id = action.payload;
            const post = state[id] ?? {
                likes: 0,
                dislikes: 0,
                favorite: false,
                userReaction: null,
            };

            if (post.userReaction === 'like') {
                post.likes--;
                post.userReaction = null;
            } else {
                if (post.userReaction === 'dislike') post.dislikes--;
                post.likes++;
                post.userReaction = 'like';
            }

            state[id] = post;
        },

        dislike(state, action: PayloadAction<number>) {
            const id = action.payload;
            const post = state[id] ?? {
                likes: 0,
                dislikes: 0,
                favorite: false,
                userReaction: null,
            };

            if (post.userReaction === 'dislike') {
                post.dislikes--;
                post.userReaction = null;
            } else {
                if (post.userReaction === 'like') post.likes--;
                post.dislikes++;
                post.userReaction = 'dislike';
            }

            state[id] = post;
        },

        toggleFavorite(state, action: PayloadAction<number>) {
            const id = action.payload;
            const post = state[id] ?? {
                likes: 0,
                dislikes: 0,
                favorite: false,
                userReaction: null,
            };

            post.favorite = !post.favorite;
            state[id] = post;
        },
    },
});

export function subscribeReactions(store: { subscribe: (cb: () => void) => void; getState: () => any }) {
    store.subscribe(() => {
        saveReactions(store.getState().reactions);
    });
}

export const { initPostReactions, like, dislike, toggleFavorite } = reactionsSlice.actions;
export default reactionsSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types';
import { fetchPosts, fetchPostById } from '../../utils/api';

interface PostsState {
    items: Post[];
    current: Post | null;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
    items: [],
    current: null,
    status: 'idle',
};

export const loadPosts = createAsyncThunk<Post[], string | undefined>(
    'posts/loadAll',
    async (query) => {
        return fetchPosts(query);
    }
);

export const loadPost = createAsyncThunk<Post, number>(
    'posts/loadOne',
    async (id) => {
        return fetchPostById(id);
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearCurrent(state) {
            state.current = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.items = action.payload;
                state.status = 'idle';
            })
            .addCase(loadPosts.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(loadPost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadPost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.current = action.payload;
                state.status = 'idle';
            })
            .addCase(loadPost.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { clearCurrent } = postsSlice.actions;
export default postsSlice.reducer;

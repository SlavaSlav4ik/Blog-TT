import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import searchReducer from '../features/search/searchSlice';
import reactionsReducer from '../features/reactions/reactionsSlice';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        search: searchReducer,
        reactions: reactionsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
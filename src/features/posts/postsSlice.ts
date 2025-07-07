import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types';
import { fetchPosts, fetchPostById } from '../../utils/api';

//Состояние постов
interface PostsState {
    items: Post[]; // Все посты
    current: Post | null; // Один выбранный пост
    status: 'idle' | 'loading' | 'failed' | 'succeeded'; // ⚠ Статус загрузки
}

const initialState: PostsState = {
    items: [],
    current: null,
    status: 'idle',
};

//Асинхронная загрузка всех постов по запросу
export const loadPosts = createAsyncThunk<Post[], string | undefined>(
    'posts/loadAll',
    async (query) => {
        return fetchPosts(query);
    }
);

//Асинхронная загрузка одного поста по id
export const loadPost = createAsyncThunk<Post, number>(
    'posts/loadOne',
    async (id) => {
        return fetchPostById(id);
    }
);

//Слайс постов
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        //Очистка выбранного поста
        clearCurrent(state) {
            state.current = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //Загружаем все посты
            .addCase(loadPosts.pending, (state) => {
                state.status = 'loading'; //  Пошла загрузка
            })
            .addCase(loadPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.items = action.payload;
                state.status = 'succeeded'; //  Успешно загружено
            })
            .addCase(loadPosts.rejected, (state) => {
                state.status = 'failed'; //  Ошибка при загрузке
            })

            //Загружаем один пост
            .addCase(loadPost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadPost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.current = action.payload;
                state.status = 'succeeded'; //  Успешно загружено один пост
            })
            .addCase(loadPost.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { clearCurrent } = postsSlice.actions;

export default postsSlice.reducer;

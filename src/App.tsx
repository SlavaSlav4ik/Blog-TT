// App.tsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { initPostReactions } from './features/reactions/reactionsSlice';

const App = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(s => s.posts.items);

    // Инициализировать реакции для всех постов
    useEffect(() => {
        posts.forEach(p => dispatch(initPostReactions(p.id)));
    }, [posts, dispatch]);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
    <Route path="/posts/:postId" element={<PostPage />} />
    </Routes>
);
};

export default App;

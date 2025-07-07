import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadPosts } from '../features/posts/postsSlice';
import { setQuery } from '../features/search/searchSlice';
import PostCard from '../components/PostCard/PostCard';
import SearchBar from '../components/SearchBar/SearchBar';
import PaginatedPosts from '../components/PaginatedPosts/PaginatedPosts';

import './HomePage.css';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, status } = useAppSelector((state) => state.posts);
    const query = useAppSelector((state) => state.search.query);

    useEffect(() => {
        dispatch(loadPosts(query)); // Загруза постов с поиска
    }, [dispatch, query]);

    // Разделка постов 1 лонг и 6 мини. Остальное в пангин
    const [bigPost, smallPosts, remainingPosts] = useMemo(() => {
        if (items.length === 0) return [null, [], []];

        const shuffled = [...items];
        const randomIndex = Math.floor(Math.random() * shuffled.length);
        const largePost = shuffled.splice(randomIndex, 1)[0]; // Лонг
        const small = shuffled.splice(0, 6); // 6 маленьких
        return [largePost, small, shuffled]; // Излишки в пангин
    }, [items]);

    return (
        <div className="homepage">
            {/*  Заголовок страницы */}
            <div className="homepage-info">
                <h1 className="one-title">Блог</h1>
                <p className="txtP">
                    Здесь мы делимся интересными кейсами из наших проектов, пишем про IT,
                    а также переводим зарубежные статьи
                </p>
            </div>

            {/*  Поиск */}
            <SearchBar
                value={query}
                onSearch={(q) => dispatch(setQuery(q))}

            />
            {/*  Роботает только после окончание написание 400 мс DEBAUNS */}

            {/* ⚠ Статусы загрузки */}
            {status === 'loading' && <p className="status">Загрузка...</p>}
            {status === 'failed' && <p className="status">Ошибка при загрузке</p>}

            {/* 🔍 Если ничего не найдено */}
            {status === 'succeeded' && items.length === 0 && (
                <div className="no-results">
                    <p className="no-results__text">😕 Ничего не найдено по запросу 😕</p>
                </div>
            )}


            {/*  Посты */}
            {bigPost && (
                <div className="posts">
                    {/*Лонг пост*/}
                    <div className="post-large">
                        <PostCard post={bigPost} fullWidth />
                    </div>

                    {/*  6 маленьких постов */}
                    <div className="post-grid">
                        {smallPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>

                    {/*Пангин посты*/}
                    <PaginatedPosts posts={remainingPosts} />
                </div>
            )}
        </div>
    );
};

export default HomePage;

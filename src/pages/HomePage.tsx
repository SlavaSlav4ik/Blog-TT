import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadPosts } from '../features/posts/postsSlice';
import { setQuery } from '../features/search/searchSlice';
import PostCard from '../components/PostCard/PostCard';
import SearchBar from '../components/SearchBar/SearchBar';
import './HomePage.css';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, status } = useAppSelector((s) => s.posts);
    const query = useAppSelector((s) => s.search.query);

    useEffect(() => {
        dispatch(loadPosts(query));
    }, [dispatch, query]);

    return (
        <div className="homepage">
            <div className='homepage-info'>
                <h1 className='one-title'>Блог</h1>
                <p className='txtP'>
                    Здесь мы делимся интересными кейсами из наших проектов,
                    пишем про IT,
                    а также переводим зарубежные статьи
                </p>
            </div>

            <SearchBar value={query} onSearch={(q) => dispatch(setQuery(q))} />

            {status === 'loading' && <p className="status">Загрузка...</p>}
            {status === 'failed' && <p className="status">Ошибка при загрузке</p>}

            {items.length > 0 && (
                <div className="posts">
                    <div className="post-large">
                        <PostCard post={items[0]} fullWidth />
                    </div>
                    <div className="post-grid">
                        {items.slice(1).map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;

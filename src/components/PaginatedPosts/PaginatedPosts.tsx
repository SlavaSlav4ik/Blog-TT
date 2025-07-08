import React, { useState } from 'react';
import './PaginatedPosts.css';
import { Post } from '../../types';
import PostCard from '../PostCard/PostCard';

const POSTS_PER_PAGE = 6;
const PAGINATION_WINDOW = 10; // Страниц в доступе показа

interface PaginatedPostsProps {
    posts: Post[];
}

const PaginatedPosts: React.FC<PaginatedPostsProps> = ({ posts }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

    // Диапазон отображаемых страниц
    const getVisiblePages = () => {
        let start = Math.max(1, currentPage - Math.floor(PAGINATION_WINDOW / 2));
        const end = Math.min(totalPages, start + PAGINATION_WINDOW - 1);

        // Проверка на кол-во страницы
        start = Math.max(1, end - PAGINATION_WINDOW + 1);

        return { start, end };
    };

    const { start, end } = getVisiblePages();
    const currentPosts = posts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    // Переход на N страниц вперед
    const jumpPages = (increment: number) => {
        const newPage = Math.min(currentPage + increment, totalPages);
        setCurrentPage(newPage);
    };

    return (
        <div className="paginated-container">
            {/* Список постов текущей страницы */}
            <div className="post-grid">
                {currentPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {/* Пагинация */}
            <div className="pagination">
                {/* Кнопка "Назад" */}
                {currentPage > 1 && (
                    <button onClick={() => setCurrentPage(currentPage - 1)}>
                        ←
                    </button>
                )}

                {/* Основной диапазон страниц */}
                {Array.from({ length: end - start + 1 }, (_, idx) => {
                    const page = start + idx;
                    return (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={currentPage === page ? 'active' : ''}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Кнопка "Вперед" */}
                {currentPage < totalPages && (
                    <button onClick={() => setCurrentPage(currentPage + 1)}>
                        →
                    </button>
                )}
            </div>
        </div>
    );
};

export default PaginatedPosts;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById } from '../utils/api';
import { Post } from '../types';
import ReactionButtons from '../components/ReactionButtons/ReactionButtons';
import './PostPage.css';

const PostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (postId) {
            fetchPostById(+postId).then(setPost);
        }
    }, [postId]);

    if (!post) return <p>Загрузка...</p>;

    return (
        <div className="post-page">
            {/* Кнопка назад */}
            <div className="post-header">
                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Вернуться к статьям
                </button>
                <ReactionButtons postId={post.id} />
            </div>

            <img src="https://placehold.co/800x300" alt="" />
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
};

export default PostPage;
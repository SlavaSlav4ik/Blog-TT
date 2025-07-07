import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../../types';
import ReactionButtons from '../ReactionButtons/ReactionButtons';
import { useAppDispatch } from '../../app/hooks';
import { initPostReactions } from '../../features/reactions/reactionsSlice';
import './PostCard.css';

interface Props {
    post: Post;
    fullWidth?: boolean; // Если true — это большой пост
}

const PostCard: React.FC<Props> = ({ post, fullWidth }) => {
    const nav = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initPostReactions(post.id)); // Инициализация реакций
    }, [dispatch, post.id]);

    return (
        <div
            className={fullWidth ? 'post-card full' : 'post-card'}
            onClick={() => nav(`/posts/${post.id}`)}
        >
            <div className="img_post">
                <img
                    className="img_post_ns"
                    src={fullWidth
                        ? 'https://placehold.co/800x300'
                        : 'https://placehold.co/560x430'}
                    alt="post"
                />

                <h2 className="post-title">{post.title}</h2>

                {fullWidth && (
                    <p className="post-body-preview">
                        {post.body.slice(0, 150)}…
                    </p>
                )}

                <div className="main_txt">
                    <ReactionButtons postId={post.id} />
                    <div className="read-more-link">Читать далее</div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../../types';
import ReactionButtons from '../ReactionButtons/ReactionButtons';
import { useAppDispatch } from '../../app/hooks';
import { initPostReactions } from '../../features/reactions/reactionsSlice';
import './PostCard.css';

interface Props {
    post: Post;
    fullWidth?: boolean;
}

const PostCard: React.FC<Props> = ({ post, fullWidth }) => {
    const nav = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initPostReactions(post.id));
    }, [dispatch, post.id]);

    return (
        <div
            className={fullWidth ? 'post-card full' : 'post-card'}
            onClick={() => nav(`/posts/${post.id}`)}
        >
            <img src={`https://placehold.co/600x200`} alt="" />
            <h2>{post.title}</h2>
            <p>{post.body.slice(0, 100)}…</p>
            <ReactionButtons postId={post.id} />
        </div>
    );
};

export default PostCard;
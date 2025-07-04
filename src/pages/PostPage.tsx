import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../utils/api';
import { Post } from '../types';
import ReactionButtons from '../components/ReactionButtons/ReactionButtons';
import './PostPage.css';

const PostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (postId) {
            fetchPostById(+postId).then(setPost);
        }
    }, [postId]);

    if (!post) return <p>Загрузка...</p>;

    return (
        <div className="post-page">
            <img src="https://placehold.co/800x300" alt="" />
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <ReactionButtons postId={post.id} />
        </div>
    );
};

export default PostPage;

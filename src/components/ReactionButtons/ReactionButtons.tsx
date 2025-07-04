import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { like, dislike, toggleFavorite } from '../../features/reactions/reactionsSlice';
import './ReactionButtons.css';

interface Props { postId: number; }

const ReactionButtons: React.FC<Props> = ({ postId }) => {
    const dispatch = useAppDispatch();
    const reactions = useAppSelector(s => s.reactions[postId]);

    // Если реакции не загружены, показываем заглушку
    if (!reactions) {
        return (
            <div className="reactions">
                <button disabled>👍 0</button>
                <button disabled>👎 0</button>
                <button disabled>☆</button>
            </div>
        );
    }

    const { likes, dislikes, favorite } = reactions;

    return (
        <div className="reactions">
            <button onClick={e => { e.stopPropagation(); dispatch(like(postId)); }}>
                👍 {likes}
            </button>
            <button onClick={e => { e.stopPropagation(); dispatch(dislike(postId)); }}>
                👎 {dislikes}
            </button>
            <button onClick={e => { e.stopPropagation(); dispatch(toggleFavorite(postId)); }}>
                {favorite ? '★' : '☆'}
            </button>
        </div>
    );
};

export default ReactionButtons;
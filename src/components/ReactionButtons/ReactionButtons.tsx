import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { like, dislike, toggleFavorite } from '../../features/reactions/reactionsSlice';
import './ReactionButtons.css';

interface Props {
    postId: number;
}

const ReactionButtons: React.FC<Props> = ({ postId }) => {
    const dispatch = useAppDispatch();
    const reactions = useAppSelector(state => state.reactions[postId]);

    if (!reactions) {
        return (
            <div className="reactions">
                <button className="reaction-button" disabled>👍 0</button>
                <button className="reaction-button" disabled>👎 0</button>
            </div>
        );
    }

    const { likes, dislikes, userReaction } = reactions;

    return (
        <div className="reactions">
            <button
                className={`reaction-button ${userReaction === 'like' ? 'liked' : ''}`}
                onClick={e => {
                    e.stopPropagation();
                    dispatch(like(postId));
                }}
            >
                👍 {likes}
            </button>

            <button
                className={`reaction-button ${userReaction === 'dislike' ? 'disliked' : ''}`}
                onClick={e => {
                    e.stopPropagation();
                    dispatch(dislike(postId));
                }}
            >
                👎 {dislikes}
            </button>
        </div>
    );
};

export default ReactionButtons;

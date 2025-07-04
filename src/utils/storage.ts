import { ReactionsState } from '../features/reactions/reactionsSlice';

const KEY = 'blog_reactions';

export function saveReactions(state: ReactionsState) {
    localStorage.setItem(KEY, JSON.stringify(state));
}

export function loadReactions(): ReactionsState | undefined {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : undefined;
}

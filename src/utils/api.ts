import { Post } from '../types';

const BASE = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts(query?: string): Promise<Post[]> {
    const q = query ? `?q=${encodeURIComponent(query)}` : '';
    const res = await fetch(`${BASE}/posts${q}`);
    return res.json();
}

export async function fetchPostById(id: number): Promise<Post> {
    const res = await fetch(`${BASE}/posts/${id}`);
    return res.json();
}

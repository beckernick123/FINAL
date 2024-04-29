import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import PostItem from './PostItem';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('created_at');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            setError(null);
            let query = supabase.from('posts').select('*');

            if (search) {
                query = query.ilike('title', `%${search}%`);
            }

            if (sort === 'upvotes') {
                query = query.order('upvotes', { ascending: false });
            } else {
                query = query.order('created_at', { ascending: false });
            }

            const { data, error } = await query;
            if (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to fetch posts');
            } else {
                setPosts(data);
            }
            setIsLoading(false);
        };

        fetchPosts();
    }, [search, sort]);

    if (isLoading) {
        return <div>Loading posts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="post-list">
            <input
                className="search-input"
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="created_at">Sort by Date</option>
                <option value="upvotes">Sort by Upvotes</option>
            </select>
            {posts.map(post => (
                <div key={post.id} className="post-item">
                    <PostItem post={post} />
                </div>
            ))}
        </div>
    );
};

export default PostList;
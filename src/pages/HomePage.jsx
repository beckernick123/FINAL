import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PostList from '../components/PostList';

const HomePage = () => {
    const navigate = useNavigate();

    const handleCreatePost = () => {
        navigate('/create-post');
    };

    return (
        <div className="main-content">
            <div className="header">
                <Link to="/" className="btn-home">Home</Link>
                <button onClick={handleCreatePost} className="btn-create-post">Create New Post</button>
            </div>

            <div className="content-wrapper">
                <div className="content-background"></div>

                <div className="left-side"></div>
                <div className="center-content">
                    <div className="home-page">
                        <h1 className="page-title">UFC Forum</h1>
                        <PostList />
                    </div>
                </div>
                <div className="right-side"></div>
            </div>
        </div>
    );
};

export default HomePage;

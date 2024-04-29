// src/components/CreatePostForm.jsx
import React, { useState } from 'react';
import supabase from '../supabaseClient'; // Adjust the path as needed

const CreatePostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('posts')
            .insert([{ title, content, image_url: imageUrl }]);

        if (error) {
            console.error("Error creating post:", error);
            alert("Failed to create post: " + error.message);
        } else {
            console.log("Post created successfully", data);
            setTitle('');
            setContent('');
            setImageUrl('');
            alert("Post created successfully!");
        }
    };

    return (
        <form className="create-post-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Create New Post</h2>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                    className="form-input"
                    type="text"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="content">Content:</label>
                <textarea
                    className="form-textarea"
                    id="content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="imageUrl">Image URL/:</label>
                <input
                    className="form-input"
                    type="url"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                />
            </div>
            <button className="button" type="submit">Create Post</button>
        </form>
    );
};

export default CreatePostForm;

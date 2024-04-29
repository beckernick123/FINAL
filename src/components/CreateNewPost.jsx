import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient'; // make sure this path is correct for your setup

function CreateNewPost() {
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        imageUrl: '',
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPostData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const { title, content, imageUrl } = postData;
        
        // Call the Supabase API to insert the new post data
        const { data, error } = await supabase
            .from('posts') // Make sure this matches your table name
            .insert([{
                title,
                content,
                image_url: imageUrl, // Ensure this matches your column names
                // You might want to set other fields like author_id, depending on your app's logic
            }]);

        if (error) {
            console.error('Error submitting post:', error);
        } else {
            console.log('New post created:', data);
            navigate('/'); // Navigate to the home page or post list page after submitting
        }
    };

    return (
        <div className="create-post-page">
            <div className="create-post-container">
                <h1>Create a New Post</h1>
                <form onSubmit={handleSubmit} className="create-post-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={postData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content (Optional)</label>
                        <textarea
                            id="content"
                            name="content"
                            value={postData.content}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image-url">Image URL / MP4 URL (Optional)</label>
                        <input
                            type="text"
                            id="image-url"
                            name="imageUrl"
                            value={postData.imageUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn">Create Post</button>
                </form>
            </div>
        </div>
    );
}

export default CreateNewPost;

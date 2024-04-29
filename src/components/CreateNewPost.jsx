import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateNewPost() {
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        imageUrl: '', // Adding an image URL field
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPostData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting post:", postData);
        // Here you would typically handle the post request to your backend
        navigate('/'); // Navigate to the home page or post list page after submitting
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
                        <label htmlFor="image-url">Image URL (Optional)</label>
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

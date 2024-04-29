import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Import Link
import supabase from '../supabaseClient';
import '../index.css'; // Import your index.css file

const PostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [editing, setEditing] = useState(false);
    const [newContent, setNewContent] = useState('');

    // Fetch post and comments
    const fetchPost = async () => {
        const { data: postData, error: postError } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();

        if (postError) {
            console.error('Error fetching post:', postError);
            return;
        }
        setPost(postData);

        const { data: commentsData, error: commentsError } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', id);

        if (commentsError) {
            console.error('Error fetching comments:', commentsError);
            return;
        }
        setComments(commentsData);
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    const addComment = async () => {
        const { data, error } = await supabase
            .from('comments')
            .insert([{ post_id: id, content: commentText }]);
        if (error) {
            console.error('Error adding comment:', error);
            return;
        }
        setComments(prevComments => [...prevComments, ...data]);
        setCommentText("");
    };

    const upvotePost = async () => {
        const { data, error } = await supabase
            .from('posts')
            .update({ upvotes: (post.upvotes || 0) + 1 })
            .eq('id', id)
            .single();
        if (error) {
            console.error('Error upvoting post:', error);
            return;
        }
        setPost({ ...post, upvotes: data.upvotes });
    };

    const deletePost = async () => {
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);
        if (error) {
            console.error('Error deleting post:', error);
            return;
        }
        navigate('/');
    };

    const handleEdit = () => {
        setEditing(true);
        setNewContent(post.content);
    };

    const saveEdit = async () => {
        const { data, error } = await supabase
            .from('posts')
            .update({ content: newContent })
            .eq('id', id)
            .single();
        if (error) {
            console.error('Error updating post:', error);
            setEditing(false); // Exit editing mode on error
            return;
        }
        setPost({ ...post, content: data.content }); // Update with new content
        setEditing(false); // Exit editing mode
    };

    const cancelEdit = () => {
        setEditing(false);
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className="post-page">
            <div className="left-side">
                {/* Left side content, if any */}
            </div>
            <div className="center-content">
                <h1 className="post-title">{post.title}</h1>
                {/* Display the image */}
                <img src={post.image_url} alt="Post Image" className="post-image" />
                {
                    editing ? (
                        <>
                            <textarea
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                                className="edit-textarea"
                            />
                            <button onClick={saveEdit} className="button save-button">Save</button>
                            <button onClick={cancelEdit} className="button cancel-button">Cancel</button>
                        </>
                    ) : (
                        <>
                            <p className="post-content">{post.content}</p>
                            <button onClick={handleEdit} className="button edit-button">Edit Post</button>
                            <button onClick={upvotePost} className="button upvote-button">Upvote ({post.upvotes})</button>
                            <button onClick={deletePost} className="button delete-button">Delete Post</button>
                        </>
                    )
                }
                <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment"
                    className="comment-input"
                />
                <button onClick={addComment} className="button comment-button">Comment</button>
                {comments.map(comment => (
                    <div key={comment.id} className="comment-item">
                        <p className="comment-content">{comment.content}</p>
                    </div>
                ))}
            </div>
            <div className="right-side">
                {/* Right side content, if any */}
            </div>
            <Link to="/" className="button back-button">Back to Home</Link> {/* Add back button */}
        </div>
    );
};

export default PostPage;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import '../index.css';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    fetchPostAndComments();
  }, [id]);
  const fetchPostAndComments = async () => {
    await fetchPost();
    await fetchComments();
  };


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
    setNewTitle(postData.title);
    setNewContent(postData.content);
    setNewImageUrl(postData.image_url);
  };

  const fetchComments = async () => {
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
  const addComment = async () => {
    if (commentText.trim()) {
      const { error } = await supabase
        .from('comments')
        .insert([{ post_id: id, content: commentText, created_at: new Date() }]);
      
      setCommentText('');

      if (error) {
        console.error('Error adding comment:', error);
      } else {
        await fetchComments();
      }
    }
  };

  const upvotePost = async () => {
    const { error } = await supabase
      .from('posts')
      .update({ upvotes: (post.upvotes || 0) + 1 })
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error upvoting post:', error);
    } else {
      // Re-fetch post to get the updated upvote count
      await fetchPost();
    }
  };

  const deletePost = async () => {
    try {
      // Start by deleting all comments associated with the post
      const { error: commentsError } = await supabase
        .from('comments')
        .delete()
        .eq('post_id', id);

      if (commentsError) {
        console.error('Error deleting comments:', commentsError);
        throw commentsError;
      }

      // Then delete the post
      const { error: postError } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (postError) {
        console.error('Error deleting post:', postError);
        throw postError;
      }

      // If no error, navigate back to the home page
      navigate('/');
    } catch (error) {
      console.error('Error during delete operation:', error);
    }
  };

  const isVideo = (url) => {
    return (url.match(/\.(mp4)$/) != null);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const saveEdit = async () => {
    const { data, error } = await supabase
      .from('posts')
      .update({ title: newTitle, content: newContent, image_url: newImageUrl })
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error updating post:', error);
      setEditing(false);
      return;
    }
    setPost({ ...post, title: newTitle, content: newContent, image_url: newImageUrl });
    setEditing(false);
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
        {editing ? (
          <>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="edit-title-input"
              placeholder="Post Title"
            />
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="edit-textarea"
              placeholder="Post Content"
            />
            <input
              type="text"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="edit-image-url-input"
              placeholder="Image/Video URL"
            />
            <button onClick={saveEdit} className="button save-button">Save</button>
            <button onClick={cancelEdit} className="button cancel-button">Cancel</button>
          </>
        ) : (
          <>
            <h1 className="post-title">{post.title}</h1>
            {isVideo(post.image_url) ? (
              <video controls className="post-video">
                <source src={post.image_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={post.image_url} alt="Post" className="post-image" />
            )}
            <p className="post-content">{post.content}</p>
            <button onClick={handleEdit} className="button edit-button">Edit Post</button>
            <button onClick={upvotePost} className="button upvote-button">Upvote ({post.upvotes})</button>
            <button onClick={deletePost} className="button delete-button">Delete Post</button>
          </>
        )}
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
            <small>{new Date(comment.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <div className="right-side">
        {/* Right side content, if any */}
      </div>
      <Link to="/" className="button back-button">Back to Home</Link>
    </div>
  );
};

export default PostPage;
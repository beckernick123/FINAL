import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const PostItem = ({ post }) => {
    const linkStyle = {
        textDecoration: 'none', // Remove underline
        color: 'inherit', // Inherit text color from parent
    };

    return (
        <Link to={`/post/${post.id}`} style={linkStyle} className="post-item-link">
            <div className="post-item">
                <div className="post-box">
                    <div className="post-meta">
                        Posted {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })} - Upvotes: {post.upvotes}
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    {post.image && <img src={post.image} alt="Post Image" className="post-image" />}
                    <p className="post-content">{post.content}</p>
                    {/* Comments section */}
                    <div className="post-comments">
                        <h4></h4>
                        {post.comments && post.comments.length > 0 ? (
                            post.comments.map((comment, index) => (
                                <div key={index} className="comment">
                                    <p>{comment.text}</p>
                                    <small>
                                        - {comment.author}, {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                                    </small>
                                </div>
                            ))
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PostItem;

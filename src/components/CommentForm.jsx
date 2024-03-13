import React, { useState } from 'react';
import { postComment } from '../../utils/api';
import UserContext from '../contexts/UserContext';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CommentForm = ({ articleId, addComment }) => {
  const [newComment, setNewComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (!newComment.trim()) {
      setCommentError("Comment body cannot be empty");
      return;
    }
  
    if (isSubmitting) {
      return;
    }
  
    setIsSubmitting(true);
  
    const commentData = {
      username: currentUser.username,
      body: newComment,
    };
  
    postComment(articleId, commentData)
      .then((newComment) => {
        addComment(newComment); 
        setNewComment(""); 
        setCommentError(null);
        toast.success("Your comment has been posted!");
      })
      .catch((err) => {
        console.error("Error posting comment:", err);
        setCommentError("Error posting comment. Please try again.");
        toast.error("Error posting comment. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return (
    <div className="comment-form">
       <ToastContainer  className="toast-container"
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment-body">
          Comment as {currentUser.username}
        </label>
        <br />
        <textarea
          id="comment-body"
          placeholder="Write your comment..."
          value={newComment}
          onChange={handleCommentChange}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </button>
        {commentError && <p className="error-message">{commentError}</p>}
      </form>
    </div>
  );
};

export default CommentForm;
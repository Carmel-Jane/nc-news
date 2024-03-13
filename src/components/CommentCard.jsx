import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { deleteComment } from '../../utils/api';

const CommentCard =({comment})=>{
  const { currentUser } = useContext(UserContext);
  const [deleted, setDeleted] = useState(false)
  
  let deleteButton = null

  function handleDelete (event) {
      event.preventDefault()
      setDeleted(true)
      deleteComment(event.target.value)
  }

  if (currentUser.username === comment.author) {
      deleteButton = <button value={comment.comment_id} className="delete-button" onClick={handleDelete} >Delete comment</button>
  }
    const formatDate = (dateString) =>{
        const date = new Date(dateString)
        return date.toLocaleString()
      }
      return (deleted ? 
        <li className="comment-card">
    <h3>{comment.author}:</h3>
    <p>Comment Deleted</p>
    </li> : 
        <li className="comment-card">
            <h3>{comment.author} commented:</h3>
            <p className='comment-date'>{formatDate(comment.created_at)}</p>
            <p className='comment-body'>{comment.body}</p>
            <p className='comment-votes'>{comment.votes} votes</p>
            {deleteButton}
        </li>
    )
      }


export default CommentCard
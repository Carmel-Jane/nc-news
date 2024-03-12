const CommentCard =({comment})=>{
    const formatDate = (dateString) =>{
        const date = new Date(dateString)
        return date.toLocaleString()
      }
      return (
        <li className="comment-card">
            <h3>{comment.author} commented:</h3>
            <p className='comment-date'>{formatDate(comment.created_at)}</p>
            <p className='comment-body'>{comment.body}</p>
            <p className='comment-votes'>{comment.votes} votes</p>
        </li>
    )
      }


export default CommentCard
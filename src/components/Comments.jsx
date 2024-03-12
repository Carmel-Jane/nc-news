import { useEffect, useState } from "react";
import { fetchAllComments } from "../../utils/api";
import CommentCard from "./CommentCard";


const Comments = ({articleId})=>{
  const [commentsList, setCommentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() =>{
    setIsLoading(true)
    fetchAllComments(articleId)
    .then((commentsData) =>{
      setCommentsList(commentsData)
      setIsLoading(false)
    })
    .catch((err) =>{
      console.log(err, "fetch comment list error")
    })
  }, [articleId])
  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <h2>Comments</h2>
      <ul>{commentsList.map((comment) => {
        return <CommentCard comment={comment} setCommentsList={setCommentsList} />
      })}</ul>
    </div>
  );
}
export default Comments
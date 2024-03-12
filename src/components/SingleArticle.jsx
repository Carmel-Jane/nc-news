import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../../utils/api";


const SingleArticle = () =>{
    const [article, setArticle] = useState({})
    let { articleId } = useParams()
    
    useEffect(() =>{
      fetchArticleById(articleId)
      .then((article) =>{
        setArticle(article)
      })
    },[articleId])
  
  
    const formatDate = (dateString) =>{
      const date = new Date(dateString)
      return date.toLocaleString()
    }
  
    return (
        <>
        <div className="single-article-header">
        <h3>{article.title}</h3>
        
        <p>Posted by: {article.author}</p>
        <p>Date posted: {formatDate(article.created_at)}</p>
       
      </div>
      <img className="single-article-image" src={article.article_img_url} />
      <div className="single-article-body">
        <p>{article.body}</p>
      </div>
      <div className="single-article-details">
        <p>comments: {article.comment_count}</p>
        <p>votes: {article.votes}</p>
        <p>topic: {article.topic}</p>
      </div>
      </>
    )
  }
  
  export default SingleArticle
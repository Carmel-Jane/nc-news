import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../../utils/api";
import { Link } from "react-router-dom";
import Comments from "./Comments";

const SingleArticle = () =>{
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    let { articleId } = useParams()

    useEffect(() =>{
        setIsLoading(true)
      fetchArticleById(articleId)
      .then((article) =>{
        setArticle(article)
        setIsLoading(false)
      })
    },[articleId])
  
    if (isLoading) return <p>Loading...</p>

    const formatDate = (dateString) =>{
      const date = new Date(dateString)
      return date.toLocaleString()
    }
  
    return (
        <div className="single-article">
          <div className="single-article-header">
            <h2>{article.title}</h2>
            <p>Posted by: {article.author}</p>
            <p>Date posted: {formatDate(article.created_at)}</p>
          </div>
          <img className="single-article-image" src={article.article_img_url} alt={article.title} />
          <div className="single-article-body">
            <p>{article.body}</p>
          </div>
          <div className="single-article-details">
            <p>Comments: {article.comment_count}</p>
            <p>Votes: {article.votes}</p>
            <p>Topic: {article.topic}</p>
          </div>
          <Comments articleId={articleId} />
        </div>
      );
    };
  
  export default SingleArticle
const ArticleCard =({ article }) => {
const formatDate = (dateString) =>{
    const date = new Date(dateString)
    return date.toLocaleString()
  }
    return (
      <li className="article-card">
        <div className="article-card-header">
          <h3>{article.title}</h3>
          
          <p>Posted by: {article.author}</p>
          <p>Date posted: {formatDate(article.created_at)}</p>
         
        </div>
        <img className="article-card-image" src={article.article_img_url} />
        <div className="article-card-details">
          <p>comments: {article.comment_count}</p>
          <p>votes: {article.votes}</p>
          <p>topic: {article.topic}</p>
        </div>
      </li>
    );
  }
  export default ArticleCard
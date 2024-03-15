function ArticleCard({ article }){
const formatDate = (dateString) =>{
    const date = new Date(dateString)
    return date.toLocaleString()
  }
    return (
      <li className="article-card">
      <div className="article-card-header">
        <h3 className="article-title">{article.title}</h3>
        <p className="article-author">Posted by: {article.author}</p>
        <p className="article-date">Date posted: {formatDate(article.created_at)}</p>
      </div>
      <img className="article-card-image" src={article.article_img_url} alt="Article" />
      <div className="article-card-details">
        <p className="article-comments">Comments: {article.comment_count}</p>
        <p className="article-votes">Votes: {article.votes}</p>
        <p className="article-topic">Topic: {article.topic}</p>
      </div>
    </li>
    );
  }
  export default ArticleCard
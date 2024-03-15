import { useEffect, useState } from "react";
import { fetchAllArticles} from "../../utils/api";
import { Link, useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import React from "react";

export default function SingleTopic() {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesByTopicList, setArticlesByTopicList] = useState([]);
  const [error, setError] = useState(null); // Add an error state

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchAllArticles(slug)
      .then((articles) => {
        if (articles.error) {
          throw new Error(articles.error);
        }
        setArticlesByTopicList(Array.isArray(articles) ? articles : []);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message); 
      });
  }, [slug]);
  if (error) return <p>Error: {error}. The requested topic does not exist. To see existing topics, find the topics link in the above header. </p>; 

  if (isLoading) return <p>Loading...</p>;
   

  if (!Array.isArray(articlesByTopicList)) {
    console.error("articlesByTopicList is not an array:", articlesByTopicList);
    return <p>Error: Unable to fetch articles. Please try again later.</p>;
  }

 return (
  <>
    <h1>Articles about {slug}</h1>
    <ul className="article-list">
      {articlesByTopicList.map((article) => (<React.Fragment key={article.article_id}>
          <Link to={`/articles/${article.article_id}`}>View Article</Link>
            <ArticleCard article={article} setArticleList={setArticlesByTopicList} />
         
          </React.Fragment>
      ))}
    </ul>
  </>
);
}
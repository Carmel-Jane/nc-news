import { useEffect, useState } from "react";
import { fetchAllArticles} from "../../utils/api";
import { Link, useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import React from "react";

export default function SingleTopic() {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesByTopicList, setArticlesByTopicList] = useState([]);
  const [error, setError] = useState(null)
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
   fetchAllArticles(slug).then((articles) => {
        setArticlesByTopicList(Array.isArray(articles) ? articles : []);
      setIsLoading(false);
    }).catch((err) =>{
        setError(err);
    });
  }, [slug]);
 
  if (isLoading) return <p>Loading...</p>

  if (!Array.isArray(articlesByTopicList)) {
    console.error("articlesByTopicList is not an array:", articlesByTopicList);
    return <p>Error: Unable to fetch articles. Please try again later.</p>;
  }
  if (error) {
    return <h1>{error.status}: {error.data.msg}</h1>}

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
import { useEffect, useState } from "react";
import { fetchAllArticles } from "../../utils/api";
import ArticleCard from "./ArticleCard";
import { Link } from "react-router-dom";

const Articles = ()=>{
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() =>{
    setIsLoading(true)
    fetchAllArticles()
    .then((articlesData) =>{
      setArticleList(articlesData)
      setIsLoading(false)
    })
    .catch((err) =>{
      console.log(err, "fetch Article list error")
    })
  }, [])
  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <h2>Articles</h2>
      <ul>{articleList.map((article) => {
        return  <Link to={`/articles/${article.article_id}`}>
        <ArticleCard article={article} />
      </Link>
      })}</ul>
    </div>
  );
}
export default Articles
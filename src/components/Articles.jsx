import { useEffect, useState } from "react";
import { fetchAllArticles } from "../../utils/api";
import ArticleCard from "./ArticleCard";
import { Link } from "react-router-dom";

const Articles = ()=>{
  const [articleList, setArticleList] = useState([]);

  useEffect(() =>{
    fetchAllArticles()
    .then((articlesData) =>{
      setArticleList(articlesData)
    })
    .catch((err) =>{
      console.log(err, "fetch Article list error")
    })
  }, [])

  return (
    <div>
      <h2>Articles</h2>
      <ul>{articleList.map((article) => {
        return <Link
              key={article.article_id}
              onClick={() => {
                setArticleId(article.article_id);
              }}
              to={`/articles/${article.article_id}`}
            >
              <ArticleCard article={article} setArticleList={setArticleList} />
            </Link>
      })}</ul>
    </div>
  );
}
export default Articles
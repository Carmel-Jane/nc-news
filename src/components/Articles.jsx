import { useEffect, useState } from "react";
import { fetchAllArticles } from "../../utils/api";
import ArticleCard from "./ArticleCard";


export default function Articles() {
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
        return <ArticleCard key={article.article_id} article={article}/>
      })}</ul>
    </div>
  );
}
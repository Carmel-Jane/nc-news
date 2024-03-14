import { useEffect, useState } from "react";
import { fetchAllArticles} from "../../utils/api";
import { Link, useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";

export default function SingleTopic() {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesByTopicList, setArticlesByTopicList] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
   fetchAllArticles(slug).then((articles) => {
        setArticlesByTopicList(Array.isArray(articles) ? articles : []);
      setIsLoading(false);
    }).catch((err) =>{
        console.log(err, "fetch article by topic list error")
    });
  }, [slug]);
 
  if (isLoading) return <p>Loading...</p>

  if (!Array.isArray(articlesByTopicList)) {
    console.error("articlesByTopicList is not an array:", articlesByTopicList);
    return <p>Error: Unable to fetch articles. Please try again later.</p>;
  }

  return (
    <>
    <h1>Articles about {slug}</h1>
    <ul className="article-list">
        {articlesByTopicList.map((article) => {
            return <><Link
            key={article.article_id}
            to={`/articles/${article.article_id}`}
          >
            <ArticleCard article={article} setArticleList={setArticlesByTopicList} />
          </Link>
          </>
        })}
    </ul>
    </>
  )
}
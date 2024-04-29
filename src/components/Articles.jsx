import { useEffect, useState} from "react";
import React from "react";
import { fetchAllArticles } from "../../utils/api";
import ArticleCard from "./ArticleCard";
import { Link,  useSearchParams, useParams} from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

const Articles = ()=>{
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort_by, setSortBy] = useState(searchParams.get('sort_by')|| "created_at")
  const [order, setOrder] = useState(searchParams.get('order')||"desc")
  const {topic} = useParams()
  const [error, setError] = useState(null);
 
 
  useEffect(() => {
    setIsLoading(true);
    fetchAllArticles(topic, sort_by, order)
      .then((articlesData) => {
        if (articlesData.error) {
          throw new Error(articlesData.error);
        }
        setArticleList(articlesData);
        setSearchParams({ sort_by, order });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message)
        setError(err.message);
      });
  }, [order, sort_by]);

  const handleSortByChange = (e) => {
    setSortBy(e.target.value)
}

const handleOrderChange = (e) => {
    setOrder(e.target.value)
}

if (error) {
  return <h2>Error: The requested query does not exist. To see available queries, go to the articles link on the above header and look at the dropdown options.</h2>;
}

  if (isLoading) return <p>Loading...</p>

 

  return (
    <>
      <h2 className="article-header">Articles</h2>
      <section className="dropdown-menu">
        <FormControl className="dropdown-select">
          <InputLabel id="sort-by-label" htmlFor="sort-by">
            Sort by
          </InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by"
            value={sort_by}
            label="Sort by"
            onChange={handleSortByChange}
          >
            <MenuItem value="created_at">Date</MenuItem>
            <MenuItem value="comment_count">Comment count</MenuItem>
            <MenuItem value="votes">Votes</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="dropdown-select">
          <InputLabel id="order-by-label" htmlFor="order-by">
            Order by
          </InputLabel>
          <Select
            labelId="order-by-label"
            id="order-by"
            value={order}
            label="Order by"
            onChange={handleOrderChange}
          >
            <MenuItem value="asc">Asc</MenuItem>
            <MenuItem value="desc">Desc</MenuItem>
          </Select>
        </FormControl>
      </section>
      <div className="articles-container">
        <ul className="article-list">
          {articleList.map((article) => (
            <React.Fragment key={article.article_id}>
              <div className="article-container">
                <Link to={`/articles/${article.article_id}`} className="article-link">
                  View Article
                </Link>
                <ArticleCard article={article} />
              </div>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Articles;
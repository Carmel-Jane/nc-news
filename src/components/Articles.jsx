import { useEffect, useState } from "react";
import { fetchAllArticles } from "../../utils/api";
import ArticleCard from "./ArticleCard";
import { Link,  useSearchParams, useParams } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

const Articles = ()=>{
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort_by, setSortBy] = useState(searchParams.get('sort_by')|| "created_at")
  const [order, setOrder] = useState(searchParams.get('order')||"desc")
  const {topic} = useParams()

 
  useEffect(() =>{
    setIsLoading(true)
    fetchAllArticles(topic, sort_by, order)
    .then((articlesData) =>{
      setArticleList(articlesData)
      setSearchParams({sort_by,order })
      setIsLoading(false)
    })
    .catch((err) =>{
      console.log(err, "fetch Article list error")
    })
  }, [order, sort_by])

  const handleSortByChange = (e) => {
    setSortBy(e.target.value)
}

const handleOrderChange = (e) => {
    setOrder(e.target.value)
}

  if (isLoading) return <p>Loading...</p>

  return (   <>
  <h2>Articles</h2>
    <section className="dropdown-menu">
        <FormControl className = "dropdown-select">
            <InputLabel id="sort-by-label">Sort by</InputLabel>
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
        <FormControl className = "dropdown-select">
            <InputLabel id="order-by-label">Order by</InputLabel>
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


    <div>
      <ul>{articleList.map((article) => {
        return <>
         <li key={article.article_id}>
        <Link to={`/articles/${article.article_id}`}>View Article</Link>
        <ArticleCard article={article}/>
        </li>
        </>
      })}</ul>
    </div>
    </>
  );
}

export default Articles;
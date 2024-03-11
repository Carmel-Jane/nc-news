import axios from 'axios'

const myApi = axios.create({
  baseURL: 'https://cj-northcoders-news-api.onrender.com/api'
}) 

export const fetchAllArticles = () =>{
  return myApi.get(`/articles`)
  .then((res) =>{
    return res.data.articles
  })
}


import axios from 'axios'

const myApi = axios.create({
  baseURL: 'https://cj-northcoders-news-api.onrender.com/api'
}) 

export const fetchAllArticles = (topic) =>{
  console.log(topic)
  return myApi.get(`/articles`, { params: {topic}})
  .then((res) =>{
    return res.data.articles
  })
}

export const fetchAllTopics = () =>{
  return myApi.get('/topics')
  .then((res) =>{
    return res.data
  })
}


export const fetchArticleById = (article_id) =>{
    return myApi.get(`/articles/${article_id}`)
    .then((res) =>{
      return res.data.article
    })
}

export const fetchAllComments =(article_id)=>{
    return myApi.get(`/articles/${article_id}/comments`)
    .then((res)=>{
        return res.data.comments
    })
}

export const patchArticleVotes= (votes, article_id) =>{
    return myApi.patch(`/articles/${article_id}`, votes)
    .then((res) =>{
      return res.data.article
    })
  }


export function postComment (articleId, commentData) {
    return myApi.post(`articles/${articleId}/comments`, commentData)
}

export function deleteComment (commentId) {
  return myApi.delete(`comments/${commentId}`)
}

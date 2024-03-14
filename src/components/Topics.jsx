import { fetchAllTopics } from "../../utils/api"
import TopicCard from "./TopicCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Topics = () =>{
    const [topicList, setTopicList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() =>{
    setIsLoading(true)
    fetchAllTopics()
    .then((topicsData) =>{
      setTopicList(topicsData)
      setIsLoading(false)
    })
    .catch((err) =>{
      console.log(err, "fetch topic list error")
    })
  }, [])
  if (isLoading) return <p>Loading...</p>

  return (
    <div>
    <h2>Topics</h2>
    <ul>
      {topicList.map((topic) => (
        
          <div className="topic-container">
            <Link to={`/topics/${topic.slug}`}>View articles about {topic.slug}</Link>
            <TopicCard topic={topic} />
          </div>
     
      ))}
    </ul>
  </div>
);
}

export default Topics
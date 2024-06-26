import { fetchAllTopics } from "../../utils/api"
import TopicCard from "./TopicCard";
import React, { useState, useEffect } from "react";
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
    <div className="topics-container">
      <h2 className="topic-header">Topics</h2>
      <ul className="topic-list">
        {topicList.map((topic) => (
          <React.Fragment key={topic.slug}>
            <div className="topic-container">
              <Link to={`/topics/${topic.slug}`} className="article-link">
                View articles about {topic.slug}
              </Link>
              <TopicCard topic={topic} />
            </div>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Topics
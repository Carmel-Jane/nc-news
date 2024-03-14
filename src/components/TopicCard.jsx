const TopicCard = ({topic})=>{
    return(
        <li className="topic-card">
            <h2 className="topic-name">{topic.slug}</h2>
            <p>{topic.description}</p>
        </li>
    )
}

export default TopicCard
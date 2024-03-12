import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, patchArticleVotes } from "../../utils/api";
import Comments from "./Comments";

const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [voteError, setVoteError] = useState(null);
  const [userVote, setUserVote] = useState(0); // 0 for no vote, 1 for upvote, -1 for downvote

  let { articleId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(articleId).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [articleId]);

  if (isLoading) return <p>Loading...</p>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const addUpvote = (articleId) => {
    if (userVote === 1) return;

    setArticle((currentArticle) => {
      return { ...currentArticle, votes: currentArticle.votes + 1 };
    });

    setUserVote(1);

    const votes = { inc_votes: 1 };
    patchArticleVotes(votes, articleId)
      .then((updatedArticle) => {
        setArticle((article) =>
          article.article_id === updatedArticle.article_id
            ? { ...article, votes: updatedArticle.votes }
            : article
        );
        setVoteError(null);
      })
      .catch((err) => {
        console.log(err, "upvote error");
        setVoteError(err.message);
      });
  };

  const removeUpvote = (articleId) => {
    if (userVote === -1) return;

    setArticle((currentArticle) => {
      return { ...currentArticle, votes: currentArticle.votes - 1 };
    });

    setUserVote(-1);

    const votes = { inc_votes: -1 };
    patchArticleVotes(votes, articleId)
      .then((updatedArticle) => {
        setArticle((article) =>
          article.article_id === updatedArticle.article_id
            ? { ...article, votes: updatedArticle.votes }
            : article
        );
        setVoteError(null);
      })
      .catch((err) => {
        console.log(err, "downvote error");
        setVoteError(err.message);
      });
  };

  return (
    <div className="single-article">
      <div className="single-article-header">
        <h2>{article.title}</h2>
        <p>Posted by: {article.author}</p>
        <p>Date posted: {formatDate(article.created_at)}</p>
      </div>
      <img
        className="single-article-image"
        src={article.article_img_url}
        alt={article.title}
      />
      <div className="single-article-body">
        <p>{article.body}</p>
      </div>
      <div className="article-voting-buttons">
        <button id="upVote" onClick={() => addUpvote(article.article_id)}>
          Upvote
        </button>
        <button id="downVote" onClick={() => removeUpvote(article.article_id)}>
          Downvote
        </button>
      </div>
      <div className="single-article-details">
        <p>Comments: {article.comment_count}</p>
        <p>Votes: {article.votes}</p>
        <p>Topic: {article.topic}</p>
      </div>
      {voteError && <p>Error: {voteError}</p>}
      <Comments articleId={articleId} />
    </div>
  );
};

export default SingleArticle;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, patchArticleVotes, postComment } from "../../utils/api";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const SingleArticle = () => {
  const [article, setArticle] = useState({
    comments: [], // Initialize comments as an empty array
  });
  const [isLoading, setIsLoading] = useState(true);
  const [voteError, setVoteError] = useState(null);
  const [userVote, setUserVote] = useState(0);

  let { articleId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(articleId)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setIsLoading(false);
      });
  }, [articleId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const addUpvote = (articleId) => {
    if (userVote === 1) return;

    setArticle((currentArticle) => ({
      ...currentArticle,
      votes: currentArticle.votes + 1,
    }));

    setUserVote(1);

    const votes = { inc_votes: 1 };
    patchArticleVotes(votes, articleId)
      .then((updatedArticle) => {
        setArticle(updatedArticle);
        setVoteError(null);
      })
      .catch((err) => {
        console.error("Upvote error:", err.message);
        setVoteError(err.message);
      });
  };

  const removeUpvote = (articleId) => {
    if (userVote === -1) return;

    setArticle((currentArticle) => ({
      ...currentArticle,
      votes: currentArticle.votes - 1,
    }));

    setUserVote(-1);

    const votes = { inc_votes: -1 };
    patchArticleVotes(votes, articleId)
      .then((updatedArticle) => {
        setArticle(updatedArticle);
        setVoteError(null);
      })
      .catch((err) => {
        console.error("Downvote error:", err.message);
        setVoteError(err.message);
      });
  };

  const addComment = (newComment) => {
    setArticle((prevArticle) => {
      const updatedComments = prevArticle.comments ? [...prevArticle.comments, newComment] : [newComment];
      return {
        ...prevArticle,
        comments: updatedComments,
        comment_count: (prevArticle.comment_count || 0) + 1,
      };
    });

    postComment(articleId, newComment)
      .then((postedComment) => {
        const updatedComments = (article.comments || []).map((comment) =>
          comment.id === newComment.id ? postedComment : comment
        );
        setArticle((prevArticle) => ({
          ...prevArticle,
          comments: updatedComments,
        }));
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
        const updatedComments = (article.comments || []).filter((comment) => comment.id !== newComment.id);
        setArticle((prevArticle) => ({
          ...prevArticle,
          comments: updatedComments,
          comment_count: (prevArticle.comment_count || 0) - 1,
        }));
        setVoteError("Error posting comment. Please try again.");
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
      <div className="post-comment-section">
        <CommentForm articleId={articleId} addComment={addComment} />
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
const Home = () =>{
    return( <div className="home-message">
    <h2 className="home-header">Welcome to NC News.</h2>
    <div className="home-content">
      <h3 className="home-header">Introduction</h3>
      <p>
        On this site, you can browse articles, vote, and post comments on
        each article. You can browse through the articles by their topic,
        using the topic link in the header. You can also browse through the
        articles using the articles link in the header- here you sort the
        order which you can view the articles, using the options in the
        dropdown menu. The options are date, comment count, and vote count-
        these can be in an ascending or descending order.
      </p>
      <h3 className="home-header">Instructions</h3>
      <p>
        To post a comment on an article, click on the link to the article. On
        the page, you will find a box - this is where you should write your
        article. Once you have written it, press submit. To delete one of your
        comments, press the delete comment button which should be underneath
        your comment on the comments list. You can vote for an article by
        clicking the voting buttons.
      </p>
    </div>
  </div>
);
};


export default Home
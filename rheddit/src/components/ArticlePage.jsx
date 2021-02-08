import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import CommentList from "./CommentList";
import * as api from "../utils/api";

export default class ArticlePage extends Component {
  state = {
    isLoading: true,
    article: {},
    comments: [],
  };

  componentDidMount = () => {
    const { article_id } = this.props;
    api.fetchArticleById(article_id).then((article) => {
      this.setState({ article, isLoading: false });
    });
  };

  displayComments = () => {
    const { article_id } = this.props;
    api.fetchCommentsByArticleId(article_id).then((comments) =>
      this.setState((prev) => {
        return { comments: comments };
      })
    );
  };

  upVote = () => {
    this.changeVote(1);
  };

  downVote = () => {
    if (this.state.article.votes > 0) this.changeVote(-1);
  };

  changeVote = (vote) => {
    api
      .changeArticleVotes(this.state.article.article_id, vote)
      .then((newArticle) => {
        this.setState(({ article }) => {
          return { article: { ...article, votes: (article.votes += vote) } };
        });
      });
  };

  render() {
    const { isLoading, article, comments } = this.state;
    return (
      <main className="article-page">
        {isLoading ? (
          <ClipLoader />
        ) : (
          <article>
            <p>{article.topic}</p>
            <h2>{article.title}</h2>
            <p>{article.body}</p>
            <p className="author">by: {article.author}</p>
            <button className="vote-button up" onClick={this.upVote}>
              ^
            </button>
            <button className="vote-button down" onClick={this.downVote}>
              v
            </button>
            <p className="votes">{article.votes}</p>
            <button onClick={this.displayComments}>
              {article.comment_count} Comments
            </button>
            <CommentList comments={comments} />
          </article>
        )}
      </main>
    );
  }
}

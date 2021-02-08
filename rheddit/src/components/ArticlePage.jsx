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
    console.log(this.props);
    const { article_id } = this.props;
    api.fetchArticleById(article_id).then((article) => {
      console.log(article);
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
            <button className="vote-button up">^</button>
            <button className="vote-button down">v</button>
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

import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import CommentList from "./CommentList";
import * as api from "../utils/api";
import Votes from "./Votes";
import ErrorDisplay from "./ErrorDisplay";

export default class ArticlePage extends Component {
  state = {
    isLoading: true,
    article: {},
    comments: [],
    errMessage: "",
    loadComments: this.props.loadComments === "true" ? true : false,
  };

  componentDidMount = () => {
    const { article_id } = this.props;
    api
      .fetchArticleById(article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch(({ response: { data: { msg } } }) =>
        this.setState({ errMessage: msg, isLoading: false })
      );
    if (this.state.loadComments) {
      this.displayComments();
    } else this.setState({ comments: [] });
  };

  componentDidUpdate = () => {
    const { comments, loadComments } = this.state;
    if (!comments.length && loadComments) {
      this.displayComments();
    } else if (comments.length && !loadComments) {
      this.setState({ comments: [] });
    }
  };

  displayComments = () => {
    const { article_id } = this.props;
    api
      .fetchCommentsByArticleId(article_id)
      .then((comments) =>
        this.setState((prev) => {
          return { comments: comments };
        })
      )
      .catch((err) => console.dir(err));
  };

  toggleComments = () => {
    this.setState(({ loadComments }) => {
      return { loadComments: !loadComments };
    });
  };

  addCommentToLocal = (comment) => {
    if (!this.state.comments.length) this.toggleComments();
    this.setState(
      ({ comments, article }) => {
        return {
          comments: [...comments, comment],
          article: {
            ...article,
            comment_count: article.comment_count + 1,
          },
          loadComments: true,
        };
      },
      () => console.log(this.state.comments)
    );
  };

  render() {
    const { isLoading, article, comments, errMessage } = this.state;
    if (isLoading) return <ClipLoader />;
    if (errMessage) return <ErrorDisplay msg={errMessage} />;
    return (
      <main className="article-page">
        <article>
          <p>{article.topic}</p>
          <h2>{article.title}</h2>
          <p>{article.body}</p>
          <p className="author">by: {article.author}</p>
          <Votes
            id={article.article_id}
            votes={article.votes}
            type="articles"
          />
          <button onClick={this.toggleComments}>
            {article.comment_count} Comments
          </button>
          <CommentList
            comments={comments}
            article_id={article.article_id}
            addCommentToLocal={this.addCommentToLocal}
          />
        </article>
      </main>
    );
  }
}

import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import CommentList from "./CommentList";
import * as api from "../utils/api";
import Votes from "./Votes";
import ErrorDisplay from "./ErrorDisplay";
import { StyledArticle } from "../styles/ArticleStyle";
import { Link } from "@reach/router";
import DeleteButton from "./DeleteButton";
import Deleted from "./Deleted";

export default class ArticlePage extends Component {
  state = {
    isLoading: true,
    article: {},
    comments: [],
    errMessage: "",
    showAddComment: false,
    loadComments: this.props.loadComments === "true" ? true : false,
    deleted: false,
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
          comments: [comment, ...comments],
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

  removeCommentFromLocal = (comment_id) => {
    this.setState(({ comments, article }) => {
      const newComments = comments.filter(
        (comment) => comment.comment_id !== comment_id
      );
      return {
        comments: newComments,
        article: {
          ...article,
          comment_count: article.comment_count - 1,
        },
      };
    });
  };

  toggleAddComment = () => {
    this.setState(({ showAddComment }) => {
      return { showAddComment: !showAddComment };
    });
  };

  redirect = () => {
    this.setState({ deleted: true });
  };

  render() {
    const {
      isLoading,
      article,
      comments,
      errMessage,
      showAddComment,
      deleted,
    } = this.state;
    const isAuthor = article.author === "grumpy19";
    if (deleted) return <Deleted />;
    if (isLoading) return <ClipLoader />;
    if (errMessage) return <ErrorDisplay msg={errMessage} />;
    return (
      <main className="article-page">
        <StyledArticle>
          <p>{article.topic}</p>
          <h2>{article.title}</h2>
          <Link to={`/users/${article.author}/articles`} className="author">
            by: {article.author}
          </Link>
          <p>{article.body}</p>
          {isAuthor ? (
            <DeleteButton
              type="articles"
              votes={article.votes}
              id={article.article_id}
              removeFunc={this.redirect}
            />
          ) : (
            <Votes
              id={article.article_id}
              votes={article.votes}
              type="articles"
            />
          )}
          <section className="comment-buttons">
            <button onClick={this.toggleComments}>
              {article.comment_count} Comments
            </button>
            <button onClick={this.toggleAddComment}>
              <i className="fas fa-plus"></i>
            </button>
          </section>
          <CommentList
            comments={comments}
            article_id={article.article_id}
            addCommentToLocal={this.addCommentToLocal}
            removeCommentFromLocal={this.removeCommentFromLocal}
            showAddComment={showAddComment}
          />
        </StyledArticle>
      </main>
    );
  }
}

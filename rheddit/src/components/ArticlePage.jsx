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
import PageButtons from "./PageButtons";
import SortBy from "./SortBy";
import { UserContext } from "./UserContext";

export default class ArticlePage extends Component {
  state = {
    isLoading: true,
    article: {},
    comments: [],
    errMessage: "",
    showAddComment: false,
    loadComments: this.props.location.state
      ? this.props.location.state.loadComments
      : false,
    deleted: false,
    page: 1,
    sort_by: "created_at",
    order: "desc",
  };
  static contextType = UserContext;

  componentDidMount = () => {
    const { article_id } = this.props;
    const { page, loadComments } = this.state;
    api
      .fetchArticleById(article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch(({ response: { data: { msg } } }) =>
        this.setState({ errMessage: msg, isLoading: false })
      );
    if (loadComments) {
      this.displayComments(page);
    } else this.setState({ comments: [] });
  };

  componentDidUpdate = () => {
    const { comments, loadComments, p } = this.state;
    if (!comments.length && loadComments) {
      this.displayComments(p);
    } else if (comments.length && !loadComments) {
      this.setState({ comments: [] });
    }
  };

  displayComments = (page) => {
    const { article_id } = this.props;
    const { sort_by, order } = this.state;
    api
      .fetchCommentsByArticleId(article_id, page, sort_by, order)
      .then((comments) =>
        this.setState((prev) => {
          return { comments: comments };
        })
      )
      .catch((err) => this.setState({ errMessage: err }));
  };

  toggleComments = () => {
    this.setState(({ loadComments }) => {
      return { loadComments: !loadComments };
    });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ sort_by: value }, () => this.displayComments());
  };

  handleOrder = () => {
    this.setState(
      ({ order }) => {
        if (order === "asc") return { order: "desc" };
        else return { order: "asc" };
      },
      () => this.displayComments()
    );
  };

  addCommentToLocal = (comment) => {
    const { comments } = this.state;
    if (!comments.length) this.toggleComments();
    this.setState(({ comments, article }) => {
      return {
        comments: [comment, ...comments],
        article: {
          ...article,
          comment_count: article.comment_count + 1,
        },
        loadComments: true,
      };
    });
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

  turnPage = (nextPage) => {
    this.setState(
      ({ page }) => {
        return { page: page + nextPage };
      },
      () => this.displayComments(this.state.page)
    );
  };

  render() {
    const {
      isLoading,
      article,
      comments,
      errMessage,
      showAddComment,
      deleted,
      page,
      order,
    } = this.state;
    const [user] = this.context;
    const isAuthor = article.author === user;

    if (deleted) return <Deleted />;
    if (isLoading) return <ClipLoader />;
    if (errMessage) return <ErrorDisplay msg={errMessage} />;
    return (
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
          {comments.length !== 0 && (
            <>
              <PageButtons
                page={page}
                turnPage={this.turnPage}
                article_id={article.article_id}
                type="comments"
              />
              <SortBy
                handleOrder={this.handleOrder}
                order={order}
                handleChange={this.handleChange}
                showCommentCount={false}
              />
            </>
          )}
          <button
            onClick={this.toggleAddComment}
            aria-label="toggle-add-comment"
          >
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
    );
  }
}

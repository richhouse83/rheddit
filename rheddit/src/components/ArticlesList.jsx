import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import ArticleCard from "./cards/ArticleCard";
import ErrorDisplay from "./ErrorDisplay";
import * as api from "../utils/api";
import { capitaliseString } from "../utils/utils";

export default class ArticlesList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "created_at",
    order: "desc",
    errMessage: "",
  };

  componentDidMount = () => {
    this.getArticles();
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.topic !== prevProps.topic) {
      this.setState({ isLoading: true, sort_by: "created_at", order: "desc" });
      this.getArticles();
    }
  };

  getArticles = () => {
    const { topic, username } = this.props;
    const { sort_by, order } = this.state;
    api
      .fetchArticles(topic, username, sort_by, order)
      .then((articles) => {
        this.setState({ articles, isLoading: false });
      })
      .catch(
        ({
          response: {
            data: { msg },
          },
        }) => {
          this.setState({ errMessage: msg, isLoading: false });
        }
      );
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value }, () =>
      this.getArticles()
    );
  };

  handleOrder = () => {
    this.setState(
      ({ order }) => {
        if (order === "asc") return { order: "desc" };
        else return { order: "asc" };
      },
      () => this.getArticles()
    );
  };

  render() {
    const { isLoading, articles, order, errMessage } = this.state;
    if (isLoading) return <ClipLoader />;
    if (errMessage) return <ErrorDisplay msg={errMessage} />;
    return (
      <main className="article-list">
        <h2>
          {this.props.topic
            ? capitaliseString(this.props.topic)
            : "All Articles"}
        </h2>
        {this.props.username ? <h4>posted by: {this.props.username}</h4> : null}
        <label className="sort-by">
          Sort By:
          <select onChange={this.handleChange} id="sort_by">
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comments</option>
          </select>
          <button onClick={this.handleOrder}>
            {order === "desc" ? (
              <i className="fas fa-chevron-down"></i>
            ) : (
              <i className="fas fa-chevron-up"></i>
            )}
          </button>
        </label>
        <ul>
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} {...article} />;
          })}
        </ul>
      </main>
    );
  }
}

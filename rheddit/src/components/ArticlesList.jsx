import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import ArticleCard from "./cards/ArticleCard";
import * as api from "../utils/api";

export default class ArticlesList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "created_at",
    order: "desc",
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
    api.fetchArticles(topic, username, sort_by, order).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
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
    const { isLoading, articles, order } = this.state;
    return (
      <main>
        {isLoading ? (
          <ClipLoader />
        ) : (
          <>
            <h2>Articles</h2>
            <label>
              Sort By:
              <select onChange={this.handleChange} id="sort_by">
                <option value="created_at">Date</option>
                <option value="votes">Votes</option>
                <option value="comment_count">Comments</option>
              </select>
              <button onClick={this.handleOrder}>
                {order === "desc" ? "v" : "^"}
              </button>
            </label>
            <ul>
              {articles.map((article) => {
                return <ArticleCard key={article.article_id} {...article} />;
              })}
            </ul>
          </>
        )}
      </main>
    );
  }
}

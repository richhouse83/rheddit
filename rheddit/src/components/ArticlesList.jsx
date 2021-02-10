import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import ArticleCard from "./cards/ArticleCard";
import ErrorDisplay from "./ErrorDisplay";
import * as api from "../utils/api";
import { capitaliseString } from "../utils/utils";
import SortBy from "./SortBy";
import AddArticle from "./forms/AddArticle";

export default class ArticlesList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "created_at",
    order: "desc",
    errMessage: "",
    showAddArticle: false,
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

  toggleAddArticle = () => {
    this.setState(({ showAddArticle }) => {
      return { showAddArticle: !showAddArticle };
    });
  };

  updateArticles = (newArticle) => {
    this.setState(({ articles }) => {
      return { articles: [newArticle, ...articles] };
    });
  };

  removeArticleFromLocal = (article_id) => {
    this.setState(({ articles }) => {
      const newArticles = articles.filter(
        (article) => article.article_id !== article_id
      );
      return {
        articles: newArticles,
      };
    });
  };

  render() {
    const {
      isLoading,
      articles,
      order,
      errMessage,
      showAddArticle,
    } = this.state;
    if (isLoading) return <ClipLoader />;
    if (errMessage) return <ErrorDisplay msg={errMessage} />;
    return (
      <section className="article-list">
        <h2>
          {this.props.topic
            ? capitaliseString(this.props.topic)
            : "All Articles"}
        </h2>
        {this.props.username ? <h4>posted by: {this.props.username}</h4> : null}
        <section className="article-buttons">
          <SortBy
            order={order}
            handleChange={this.handleChange}
            handleOrder={this.handleOrder}
          />
          <button onClick={this.toggleAddArticle}>
            <i className="fas fa-plus"></i>
          </button>
        </section>
        {showAddArticle && (
          <AddArticle
            topic={this.props.topic}
            updateArticles={this.updateArticles}
          />
        )}
        <ul>
          {articles.map((article) => {
            return (
              <ArticleCard
                key={article.article_id}
                {...article}
                removeArticleFromLocal={this.removeArticleFromLocal}
              />
            );
          })}
        </ul>
      </section>
    );
  }
}

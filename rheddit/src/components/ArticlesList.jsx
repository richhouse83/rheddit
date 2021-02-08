import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import ArticleCard from "./cards/ArticleCard";
import * as api from "../utils/api";

export default class ArticlesList extends Component {
  state = {
    articles: [],
    isLoading: true,
  };

  componentDidMount = () => {
    this.getTopics();
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.topic !== prevProps.topic) {
      this.setState({ isLoading: true });
      this.getTopics();
    }
  };

  getTopics = () => {
    const { topic } = this.props;
    api.fetchArticlesByTopic(topic).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  };
  render() {
    const { isLoading, articles } = this.state;
    return (
      <main>
        {isLoading ? (
          <ClipLoader />
        ) : (
          <>
            <h2>Articles</h2>
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

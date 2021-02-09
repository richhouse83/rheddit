import React, { Component } from "react";
import * as api from "../utils/api";
import { ClipLoader } from "react-spinners";
import ErrorDisplay from "./ErrorDisplay";
import TopicCard from "./cards/TopicCard";

export default class TopicsList extends Component {
  state = {
    topics: [],
    isLoading: true,
  };

  componentDidMount = () => {
    api.getTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  };

  render() {
    const { isLoading, topics, errMessage } = this.state;
    if (isLoading) return <ClipLoader />;
    if (errMessage) return <ErrorDisplay msg={errMessage} />;
    return (
      <main className="topics-list">
        {topics.map((topic) => {
          return <TopicCard key={topic.slug} {...topic} />;
        })}
      </main>
    );
  }
}

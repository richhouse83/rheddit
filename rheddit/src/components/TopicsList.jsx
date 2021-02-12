import React, { Component } from "react";
import * as api from "../utils/api";
import { ClipLoader } from "react-spinners";
import ErrorDisplay from "./ErrorDisplay";
import TopicCard from "./cards/TopicCard";
import AddTopic from "./forms/AddTopic";

export default class TopicsList extends Component {
  state = {
    topics: [],
    isLoading: true,
    showAddTopics: false,
  };

  componentDidMount = () => {
    this.fetchTopics();
  };

  updateTopics = (newTopic) => {
    this.setState(
      ({ topics }) => {
        return { topics: [newTopic, ...topics] };
      },
      () => this.props.setUpdateNav((prev) => !prev)
    );
  };

  fetchTopics = () => {
    api.getTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  };

  toggleAddTopics = () => {
    this.setState(({ showAddTopics }) => {
      return { showAddTopics: !showAddTopics };
    });
  };

  render() {
    const { isLoading, topics, errMessage, showAddTopics } = this.state;
    if (isLoading) return <ClipLoader />;
    if (errMessage) return <ErrorDisplay msg={errMessage} />;
    return (
      <section className="topics-list">
        <section className="topic-button">
          <button onClick={this.toggleAddTopics}>
            <i className="fas fa-plus"></i>
          </button>
        </section>
        {showAddTopics && <AddTopic updateTopics={this.updateTopics} />}
        {topics.map((topic) => {
          return <TopicCard key={topic.slug} {...topic} />;
        })}
      </section>
    );
  }
}

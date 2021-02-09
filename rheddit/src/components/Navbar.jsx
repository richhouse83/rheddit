import React, { Component } from "react";
import * as api from "../utils/api";
import { ClipLoader } from "react-spinners";
import { Link } from "@reach/router";

export default class Navbar extends Component {
  state = {
    topics: [],
    isLoading: true,
  };

  componentDidMount() {
    this.updateTopics();
  }

  updateTopics() {
    api.fetchAllTopics().then((topics) => {
      this.setState(() => {
        return { topics, isLoading: false };
      });
    });
  }

  render() {
    const { isLoading, topics } = this.state;
    if (isLoading) return <ClipLoader />;
    return (
      <nav className="navbar">
        <Link to="/topics">topics</Link>
        {topics.map((topic) => {
          return (
            <Link to={`/articles/topic/${topic.slug}`} key={topic.slug}>
              {topic.slug}
            </Link>
          );
        })}

        <Link to={"/"}>All</Link>
      </nav>
    );
  }
}

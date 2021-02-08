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
    api.fetchAllTopics().then((topics) => {
      this.setState(() => {
        return { topics, isLoading: false };
      });
    });
  }

  render() {
    const { isLoading, topics } = this.state;
    return (
      <nav>
        {isLoading ? (
          <ClipLoader />
        ) : (
          topics.map((topic) => {
            return (
              <Link to={`/articles/${topic.slug}`} key={topic.slug}>
                {topic.slug}
              </Link>
            );
          })
        )}
      </nav>
    );
  }
}

import React, { Component } from "react";
import * as api from "../utils/api";
import { StyledNav } from "../styles/NavBarStyle";
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
    const { showNav, toggleNav } = this.props;
    if (isLoading) return <ClipLoader />;
    return (
      <StyledNav show={showNav} className="navbar">
        <Link onClick={toggleNav} to="/topics">
          topics
        </Link>
        {topics.map((topic) => {
          return (
            <Link
              onClick={toggleNav}
              to={`/articles/topic/${topic.slug}`}
              key={topic.slug}
            >
              {topic.slug}
            </Link>
          );
        })}

        <Link onClick={showNav} to={"/"}>
          All
        </Link>
      </StyledNav>
    );
  }
}

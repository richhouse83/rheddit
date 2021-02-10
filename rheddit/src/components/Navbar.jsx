import React, { Component } from "react";
import * as api from "../utils/api";
import { capitaliseString } from "../utils/utils";
import { StyledNav } from "../styles/NavBarStyle";
import { ClipLoader } from "react-spinners";
import { Link } from "@reach/router";
import SignIn from "./forms/SignIn";

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
        <SignIn />
        <Link onClick={showNav} to={"/"}>
          All Articles
        </Link>
        <Link onClick={toggleNav} to="/topics">
          Topics:
        </Link>
        {topics.map((topic) => {
          return (
            <Link
              onClick={toggleNav}
              to={`/articles/topic/${topic.slug}`}
              key={topic.slug}
            >
              {capitaliseString(topic.slug)}
            </Link>
          );
        })}
      </StyledNav>
    );
  }
}

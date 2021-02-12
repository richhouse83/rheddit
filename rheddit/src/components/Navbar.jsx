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

  componentDidUpdate() {
    console.log(this.props.updateNav);
    this.updateTopics();
  }

  updateTopics() {
    api.fetchAllTopics().then((topics) => {
      if (topics.length !== this.state.topics.length) {
        this.setState(() => {
          return { topics, isLoading: false };
        });
      }
    });
  }

  handleSlider = ({ target: { value } }) => {
    let theme = "theme1";
    switch (value) {
      case "3":
        theme = "theme1";
        break;
      case "2":
        theme = "theme2";
        break;
      case "1":
        theme = "theme3";
        break;
      default:
        theme = "theme4";
    }

    this.props.setTheme(theme);
    localStorage.setItem("rhedditTheme", theme);
  };

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
        <label>
          Choose Theme:
          <input onChange={this.handleSlider} type="range" min="0" max="3" />
        </label>
      </StyledNav>
    );
  }
}

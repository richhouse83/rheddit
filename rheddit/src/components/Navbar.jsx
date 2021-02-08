import React, { Component } from "react";
import * as api from "../utils/api";

export default class Navbar extends Component {
  state = {
    topics: [],
  };

  componentDidMount() {
    api.fetchAllTopics();
  }

  render() {
    return (
      <nav>
        <p>Navbar goes here</p>
      </nav>
    );
  }
}

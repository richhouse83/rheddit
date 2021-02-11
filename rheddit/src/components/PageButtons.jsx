import React, { Component } from "react";
import * as api from "../utils/api";

export default class PageButtons extends Component {
  state = {
    pages: 0,
    totalPages: 0,
  };

  componentDidMount = () => {
    const { type, topic, author } = this.props;
    api.getItemCount(type, topic, author).then((itemCount) => {
      const totalPages = Math.ceil(itemCount / 10);
      this.setState({ totalPages });
    });
  };

  componentDidUpdate = (prevProps) => {
    const { type, topic, author } = this.props;
    if (topic !== prevProps.topic || author !== prevProps.author) {
      api.getItemCount(type, topic, author).then((itemCount) => {
        const totalPages = Math.ceil(itemCount / 10);
        this.setState({ totalPages });
      });
    }
  };

  render() {
    const { p, turnPage } = this.props;
    const { totalPages } = this.state;
    return (
      <section className="page">
        <button disabled={p === 1} value="-1" onClick={() => turnPage(-1)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          value="1"
          disabled={p === totalPages}
          onClick={() => turnPage(1)}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </section>
    );
  }
}

import React, { Component } from "react";
import * as api from "../utils/api";

export default class PageButtons extends Component {
  state = {
    pages: 0,
    totalPages: 0,
  };

  componentDidMount = () => {
    const { type, topic, author, article_id } = this.props;

    api.getItemCount(type, topic, author, article_id).then((itemCount) => {
      const totalPages = Math.ceil(itemCount / 10);
      this.setState({ totalPages });
    });
  };

  componentDidUpdate = (prevProps) => {
    const { type, topic, author, article_id } = this.props;

    if (topic !== prevProps.topic || author !== prevProps.author) {
      api.getItemCount(type, topic, author, article_id).then((itemCount) => {
        const totalPages = Math.ceil(itemCount / 10);
        this.setState({ totalPages });
      });
    }
  };

  render() {
    const { page, turnPage } = this.props;
    const { totalPages } = this.state;

    return (
      <section className="page">
        <p className="page-count">
          Page {page} of {totalPages}
        </p>
        <button
          disabled={page === 1}
          value="-1"
          onClick={() => turnPage(-1)}
          aria-label="turn-page-back"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          value="1"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => turnPage(1)}
          aria-label="turn-page-forward"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </section>
    );
  }
}

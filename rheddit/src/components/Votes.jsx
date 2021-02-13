import React, { Component } from "react";
import * as api from "../utils/api";

export default class Votes extends Component {
  state = {
    votes: 0,
    err: false,
  };

  upVote = () => {
    this.changeVote(1);
  };

  downVote = () => {
    this.changeVote(-1);
  };

  changeVote = (vote) => {
    api.changeVotes(this.props.type, this.props.id, vote).catch((err) => {
      this.setState(({ votes }) => {
        return { votes: (votes -= vote), err: true, voted: "" };
      });
    });
    this.setState(({ votes }) => {
      let voted = "";
      if (vote > 0) voted = "up";
      if (vote < 0) voted = "down";
      return {
        votes: (votes += vote),
        err: false,
        voted,
      };
    });
  };
  render() {
    const { votes, err } = this.state;
    return (
      <section className="votes">
        <div className="vote-buttons">
          <button
            className="vote-button down"
            disabled={votes === -1}
            onClick={this.downVote}
            aria-label="vote-down"
          >
            <i className="fas fa-thumbs-down"></i>
          </button>
          <button
            className="vote-button up"
            disabled={votes === 1}
            onClick={this.upVote}
            aria-label="vote-up"
          >
            <i className="fas fa-thumbs-up"></i>
          </button>
        </div>
        <p className="vote-count">
          {votes < 0 ? (
            <i className="fas fa-thumbs-down"></i>
          ) : (
            <i className="fas fa-thumbs-up"></i>
          )}{" "}
          {this.props.votes + votes}
        </p>
        {err && <p>Error, vote not counted</p>}
      </section>
    );
  }
}

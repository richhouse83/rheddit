import React, { Component } from "react";
import * as api from "../utils/api";

export default class Votes extends Component {
  state = {
    votes: this.props.votes,
  };

  upVote = () => {
    this.changeVote(1);
  };

  downVote = () => {
    if (this.state.votes > 0) this.changeVote(-1);
  };

  changeVote = (vote) => {
    api.changeVotes(this.props.type, this.props.id, vote).then((data) => {
      if (data.article || data.comment) {
        this.setState(
          ({ votes }) => {
            return { votes: (votes += vote) };
          },
          () => console.log(this.state.votes)
        );
      }
    });
  };
  render() {
    const { votes } = this.state;
    return (
      <section className="votes">
        <button className="vote-button down" onClick={this.downVote}>
          v
        </button>
        <button className="vote-button up" onClick={this.upVote}>
          ^
        </button>
        <p className="votes">{votes}</p>
      </section>
    );
  }
}
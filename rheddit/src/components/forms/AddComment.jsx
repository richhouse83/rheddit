import React, { Component } from "react";
import * as api from "../../utils/api";

export default class AddComment extends Component {
  state = {
    body: "",
    errMessage: "",
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { body } = this.state;
    const username = localStorage.getItem("rhedditUser");
    if (username && body) {
      const newItem = { username, body };
      api
        .addItem(newItem, this.props.article_id)
        .then(({ comment }) => {
          this.props.addCommentToLocal(comment);
          this.setState({ body: "", errMessage: "" });
        })
        .catch((err) => this.setState({ errMessage: err }));
    } else if (!username)
      this.setState({ errMessage: "You must be signed in to post" });
  };

  render() {
    const { body, errMessage } = this.state;
    return (
      <section className="add-comment">
        <form onSubmit={this.handleSubmit}>
          <label aria-label="comment-body">
            <input
              value={body}
              placeholder="Add your comment here"
              onChange={this.handleChange}
              id="body"
            />
          </label>
          <button disabled={!body}>Add Comment</button>
          {errMessage && <p>{errMessage}</p>}
        </form>
      </section>
    );
  }
}

import React, { Component } from "react";
import * as api from "../../utils/api";
import { UserContext } from "../UserContext";

export default class AddComment extends Component {
  state = {
    body: "",
    errMessage: "",
  };

  static contextType = UserContext;

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { body } = this.state;
    const [user] = this.context;
    if (user && body) {
      const newItem = { username: user, body };
      api
        .addItem(newItem, this.props.article_id)
        .then(({ comment }) => {
          this.props.addCommentToLocal(comment);
          this.setState({ body: "", errMessage: "" });
        })
        .catch((err) => this.setState({ errMessage: err }));
    }
  };

  render() {
    const { body, errMessage } = this.state;
    const [user] = this.context;
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
          {!user && <p>You must be signed in to post</p>}
          {errMessage && <p>{errMessage}</p>}
        </form>
      </section>
    );
  }
}

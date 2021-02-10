import React, { Component } from "react";
import * as api from "../../utils/api";

export default class AddComment extends Component {
  state = {
    body: "",
    username: localStorage.getItem("rhedditUser"),
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, body } = this.state;
    if ((username, body)) {
      const newItem = { username, body };
      console.log(newItem);
      api
        .addItem(newItem, this.props.article_id)
        .then(({ comment }) => {
          this.props.addCommentToLocal(comment);
          this.setState({ body: "" });
        })
        .catch((err) => console.dir(err));
    }
  };

  render() {
    const { body } = this.state;
    return (
      <section className="add-comment">
        <form onSubmit={this.handleSubmit}>
          <input
            value={body}
            placeholder="Add your comment here"
            onChange={this.handleChange}
            id="body"
          />
          <button>Add Comment</button>
        </form>
      </section>
    );
  }
}

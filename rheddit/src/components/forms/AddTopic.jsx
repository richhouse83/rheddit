import React, { Component } from "react";
import * as api from "../../utils/api";

export default class AddTopic extends Component {
  state = {
    slug: "",
    description: "",
    errMessage: "",
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value, errMessage: "" });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { slug, description } = this.state;
    const author = localStorage.getItem("rhedditUser");
    if (author && slug && description) {
      const newTopic = { slug, description };
      api
        .addTopic(newTopic)
        .then(({ topic }) => {
          this.props.updateTopics(topic);
          this.setState({ slug: "", description: "", errMessage: "" });
        })
        .catch((err) => this.setState({ errMessage: err }));
    } else if (slug && description)
      this.setState({ errMessage: "You must be signed in to add a a topic" });
  };

  render() {
    const { slug, description, errMessage } = this.state;
    const disabled = !slug || !description;
    return (
      <form onSubmit={this.handleSubmit} className="add-topic">
        <input
          value={slug}
          placeholder="Topic Name"
          onChange={this.handleChange}
          id="slug"
        />
        <textarea
          className="add-topic-body"
          value={description}
          placeholder="Topic Description"
          onChange={this.handleChange}
          id="description"
        />
        <button disabled={disabled}>Create Topic</button>
        {errMessage ? <p>{errMessage}</p> : null}
      </form>
    );
  }
}

import React, { Component } from "react";
import * as api from "../../utils/api";
import { UserContext } from "../UserContext";

export default class AddTopic extends Component {
  state = {
    slug: "",
    description: "",
    errMessage: "",
  };
  static contextType = UserContext;

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value, errMessage: "" });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { slug, description } = this.state;
    const [user] = this.context;
    if (user && slug && description) {
      const newTopic = { slug, description };
      api
        .addTopic(newTopic)
        .then(({ topic }) => {
          this.props.updateTopics(topic);
          this.setState({ slug: "", description: "", errMessage: "" });
        })
        .catch((err) => this.setState({ errMessage: err }));
    }
  };

  render() {
    const { slug, description, errMessage } = this.state;
    const disabled = !slug || !description;
    const [user] = this.context;
    return (
      <form onSubmit={this.handleSubmit} className="add-topic">
        <label aria-label="topic-name">
          <input
            value={slug}
            placeholder="Topic Name"
            onChange={this.handleChange}
            id="slug"
          />
        </label>
        <label aria-label="topic-description">
          <textarea
            className="add-topic-body"
            value={description}
            placeholder="Topic Description"
            onChange={this.handleChange}
            id="description"
          />
        </label>
        <button disabled={disabled}>Create Topic</button>
        {!user && <p>You must be signed in to create a topic</p>}
        {errMessage && <p>{errMessage}</p>}
      </form>
    );
  }
}

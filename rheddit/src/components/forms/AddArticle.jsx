import React, { Component } from "react";
import * as api from "../../utils/api";
import { UserContext } from "../UserContext";

export default class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    topic: this.props.topic || "",
    topics: [],
    errMessage: "",
  };

  static contextType = UserContext;

  componentDidMount = () => {
    api.getTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value, errMessage: "" });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, body, topic } = this.state;
    const [user] = this.context;
    if (title && user && body && topic) {
      const newItem = { title, author: user, body, topic };
      api
        .addItem(newItem)
        .then(({ article }) => {
          this.props.updateArticles(article);
          this.setState({ title: "", body: "", errMessage: "" });
        })
        .catch((err) => this.setState({ errMessage: err }));
    }
  };

  render() {
    const { title, body, topics, topic, errMessage } = this.state;
    const disabled = !title || !body || !topic;
    const [user] = this.context;
    return (
      <form onSubmit={this.handleSubmit} className="add-article">
        {topic ? <p>Create new article on {topic}</p> : null}
        <select onChange={this.handleChange} id="topic">
          <option value="">{topic ? "Change" : "Select"} Topic</option>
          {topics.map((topic) => {
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
        <label aria-label="article-name">
          <input
            value={title}
            placeholder="Article Name"
            onChange={this.handleChange}
            id="title"
          />
        </label>
        <label aria-label="article-body">
          <textarea
            className="add-article-body"
            value={body}
            placeholder="Article Body"
            onChange={this.handleChange}
            id="body"
          />
        </label>
        <button disabled={disabled}>Post Article</button>
        {!user && <p>You must be signed in to post</p>}
        {errMessage ? <p>{errMessage}</p> : null}
      </form>
    );
  }
}

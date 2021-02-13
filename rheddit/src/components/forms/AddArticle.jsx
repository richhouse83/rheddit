import React, { Component } from "react";
import * as api from "../../utils/api";

export default class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    topic: this.props.topic || "",
    topics: [],
    errMessage: "",
  };

  componentDidMount = () => {
    api.getTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  };

  handleChange = ({ target: { id, value } }) => {
    const author = localStorage.getItem("rhedditUser");
    if (author) {
      this.setState({ [id]: value, errMessage: "" });
    } else
      this.setState({
        [id]: value,
        errMessage: "You must be signed in to post",
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, body, topic } = this.state;
    const author = localStorage.getItem("rhedditUser");
    if (title && author && body && topic) {
      const newItem = { title, author, body, topic };
      api
        .addItem(newItem)
        .then(({ article }) => {
          this.props.updateArticles(article);
          this.setState({ title: "", body: "", errMessage: "" });
        })
        .catch((err) => this.setState({ errMessage: err }));
    } else if (title && body && topic)
      this.setState({ errMessage: "You must be signed in to post" });
  };

  render() {
    const { title, body, topics, topic, errMessage } = this.state;
    const disabled = !title || !body || !topic;

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
        {errMessage ? <p>{errMessage}</p> : null}
      </form>
    );
  }
}

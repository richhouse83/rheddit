import React, { Component } from "react";
import * as api from "../../utils/api";

export default class AddArticle extends Component {
  state = {
    title: "",
    body: "",
    author: "grumpy19",
    topic: this.props.topic || "",
    topics: [],
  };

  componentDidMount = () => {
    api.getTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, author, body, topic } = this.state;
    if (title && author && body && topic) {
      const newItem = { title, author, body, topic };
      api.addItem(newItem).then(({ article }) => {
        this.props.updateArticles(article);
      });
    }
  };

  render() {
    const { title, body, topics, topic } = this.state;
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
        <input
          value={title}
          placeholder="Article Name"
          onChange={this.handleChange}
          id="title"
        />
        <textarea
          className="add-article-body"
          value={body}
          placeholder="Article Body"
          onChange={this.handleChange}
          id="body"
        />
        <button>Post Article</button>
      </form>
    );
  }
}

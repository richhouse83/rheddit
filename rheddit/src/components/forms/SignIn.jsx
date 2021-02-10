import React, { Component } from "react";
import * as api from "../../utils/api";
export default class SignIn extends Component {
  state = {
    input: "",
    username: "",
    signedIn: false,
  };

  signIn = (event) => {
    event.preventDefault();
    api.getAllUsers().then((users) => {
      const user = users.find((user) => user.username === this.state.input);
      if (user) {
        localStorage.setItem("rhedditUser", user.username);
        this.setState({ input: "", username: user.username, signedIn: true });
      } else console.log("not a a user");
    });
  };

  componentDidMount = () => {
    const username = localStorage.getItem("rhedditUser");
    if (username) {
      api.getUser(username).then(({ avatar_url, name }) => {
        this.setState({ username, avatar_url, name, signedIn: true });
      });
    }
  };

  componentDidUpdate = () => {
    if (this.state.signedIn && !this.state.avatar_url) {
      console.log("now");
      const username = localStorage.getItem("rhedditUser");
      api.getUser(username).then(({ avatar_url, name }) => {
        this.setState({ username, avatar_url, name });
      });
    }
  };

  signOut = () => {
    localStorage.removeItem("rhedditUser");
    this.setState({ username: "", avatar_url: "", name: "", signedIn: false });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ input: value });
  };

  render() {
    const { input, username, avatar_url } = this.state;
    if (username)
      return (
        <section className="signed-in">
          <p>{username}</p>
          <img
            className="avatar-pic"
            src={avatar_url}
            alt={`avatar of ${username}`}
          />
          <button onClick={this.signOut}>Sign Out</button>
        </section>
      );
    return (
      <form onSubmit={this.signIn}>
        <input
          type="text"
          placeholder="Username"
          value={input}
          onChange={this.handleChange}
        />
        <button>Sign In</button>
      </form>
    );
  }
}

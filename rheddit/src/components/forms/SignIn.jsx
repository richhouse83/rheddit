import React, { Component } from "react";
import * as api from "../../utils/api";
import { UserContext } from "../UserContext";

export default class SignIn extends Component {
  state = {
    input: "",
    username: "",
    signedIn: false,
    notValid: false,
  };

  static contextType = UserContext;

  signIn = (event) => {
    event.preventDefault();
    const [user, setUser] = this.context;
    api.getAllUsers().then((users) => {
      const userFound = users.find(
        (user) => user.username === this.state.input
      );
      if (userFound) {
        localStorage.setItem("rhedditUser", userFound.username);
        this.setState({
          input: "",
          username: userFound.username,
          signedIn: true,
        });
        setUser(userFound.username);
      } else this.setState({ notValid: true });
    });
  };

  componentDidMount = () => {
    const [user] = this.context;
    if (user) {
      api
        .getUser(user)
        .then(({ avatar_url, name }) => {
          this.setState({ username: user, avatar_url, name, signedIn: true });
        })
        .catch((err) => console.log(err));
    }
  };

  componentDidUpdate = () => {
    if (this.state.signedIn && !this.state.avatar_url) {
      const [user] = this.context;
      if (user) {
        api
          .getUser(user)
          .then(({ avatar_url, name }) => {
            this.setState({ username: user, avatar_url, name });
          })
          .catch((err) => console.log(err));
      }
    }
  };

  signOut = () => {
    localStorage.removeItem("rhedditUser");
    const [user, setUser] = this.context;
    this.setState({ username: "", avatar_url: "", name: "", signedIn: false });
    setUser(null);
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ input: value, notValid: false });
  };

  render() {
    const { input, username, avatar_url, notValid } = this.state;

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
        <label aria-label="sign-in">
          <input
            type="text"
            placeholder="Username"
            value={input}
            onChange={this.handleChange}
          />
        </label>
        <button className="sign-in-button" disabled={!input}>
          Sign In
        </button>
        {notValid && <p className="invalid">Not a valid username</p>}
      </form>
    );
  }
}

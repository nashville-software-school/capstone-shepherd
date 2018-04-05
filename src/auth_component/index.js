import React, { Component } from "react";
import "./auth.css";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      username: "",
      password: "",
      // ends up as endpoint of user. Just temporary. Steve says we will be using tokens
      currentUser: null
    };
  }

  onChange(e) {
    const userState = this.state;
    userState[e.target.name] = e.target.value;
    this.setState(userState);
  }

  // Doesn't actually authenticate yet
  logIn(user) {
    this.setState({ isAuth: !this.state.isAuth, currentUser: user }, () => {
      console.log("current user is", this.state.currentUser);
    });
  }

  // use fetch instead?
  register(e) {
    console.log("register called");
    e.preventDefault();
    // get user data from state, not directly from form
    const { username, password } = this.state;
    const user = {
      username,
      password
    };
    const authReq = new XMLHttpRequest();
    authReq.addEventListener("load", e => {
      console.log(JSON.parse(e.target.responseText));
      const url = JSON.parse(e.target.responseText).url;
      this.setState({ username: "", password: "" });
      this.logIn(url);
    });
    authReq.open("POST", "http://127.0.0.1:8000/users/");
    authReq.setRequestHeader("Content-type", "application/json");
    authReq.send(JSON.stringify(user));
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h3>This person is {!this.state.isAuth ? "not" : ""} logged in</h3>
        {/* https://blog.stvmlbrn.com/2017/04/07/submitting-form-data-with-react.html */}
        <input
          type="text"
          placeholder="username"
          name="username"
          value={username}
          onChange={e => this.onChange(e)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={e => this.onChange(e)}
        />
        <button onClick={e => this.logIn(e)}>
          Log {this.state.isAuth ? "out" : "in"}
        </button>
        <button onClick={e => this.register(e)}>Register</button>
      </div>
    );
  }
}

export default Auth;

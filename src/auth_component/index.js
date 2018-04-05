import React, { Component } from "react";
import "./auth.css";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    };
  }

  logIn() {
    this.setState({ isAuth: !this.state.isAuth });
  }

  render() {
    return (
      <div>
        <h3>This person is {!this.state.isAuth ? "not" : ""} logged in</h3>
        <button onClick={() => this.logIn()}>Log {this.state.isAuth ? "out" : "in"}</button>
      </div>
    );
  }
}

export default Auth;

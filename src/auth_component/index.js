import React, { Component } from "react";
import "./auth.css";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",

    }
  }

  onChange(e) {
    const userState = Object.assign({}, this.state);
    userState[e.target.name] = e.target.value;
    this.setState(userState);
  }

  postAuth(route, user) {
    fetch(`http://127.0.0.1:8000/${route}/`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        console.log("auth", response)
        return response.json();
      })
      .then((tokenObj) => {
        console.log("converted token", tokenObj.token);
        localStorage.setItem("token", tokenObj.token)
        this.setState({
          username: "",
          password: ""
        });
      })
      .catch((err) => {
        console.log("auth no like you, brah", err);
      });
  }

  register(e) {
    console.log("register called");
    e.preventDefault();
    // get user data from state, not directly from form
    const {
      username,
      first_name,
      last_name,
      email,
      password
    } = this.state;

    const user = {
      username,
      first_name,
      last_name,
      email,
      password
    };
    this.postAuth("register", user);
  }

  logIn() {
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    this.postAuth("api-token-auth", user);
  }

  logOut() {
    console.log(localStorage.getItem("token"));
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"));
  }

  render() {
    const { username, first_name, last_name, email, password } = this.state;
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
          type="text"
          placeholder="first name"
          name="first_name"
          value={first_name}
          onChange={e => this.onChange(e)}
        />
        <input
          type="text"
          placeholder="last name"
          name="last_name"
          value={last_name}
          onChange={e => this.onChange(e)}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          value={email}
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
        <button onClick={() => this.logOut()}>Logout</button>
      </div>
    );
  }
}

export default Auth;

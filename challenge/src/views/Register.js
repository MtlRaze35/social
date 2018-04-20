import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Register extends Component {
  state = {
    name: ""
  };

  signUp = () => {
    const user = {
      name: this.state.name,
      avatar: null,
      posts: [],
      albums: []
    };

    fetch("http://localhost:3000/people", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        alert("Registered successfully");
        this.props.history.push("/");
      })
      .catch(e => {
        console.error("signup", e);
      });
  };

  render() {
    return (
      <div>
        This will be your login info!
        <input
          placeholder="Full Name"
          onChange={e => this.setState({ name: e.target.value })}
        />
        <button onClick={this.signUp}>Sign Up!</button>
      </div>
    );
  }
}

export default withRouter(Register);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, RegisterDiv } from '../styles'
import API_URL from "../API";

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

    fetch(`${API_URL}/people`, {
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
      <RegisterDiv>
        This will be your login info!
        <input
          placeholder="Full Name"
          onChange={e => this.setState({ name: e.target.value })}
        />
        <Button onClick={this.signUp}>Sign Up!</Button>
      </RegisterDiv>
    );
  }
}

export default withRouter(Register);

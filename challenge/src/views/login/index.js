import React, { Component } from "react";

import styled from "styled-components";

const LoginContainer = styled.div`
  width: 60%;
  height: 3rem;
  border: 2px solid black;
  box-shadow 2px 2px whitesmoke;
`


class Login extends Component {
  
  state = {
    username: ''
  }

handleClick = () => {
  //get request and push to user trying to log in
  console.log('user',this.state.username)
}

  render() {
    return (
      <LoginContainer>
        <input placeholder="username" onChange={(e) => this.setState({username: e.target.value})} />
        <button onClick={this.handleClick}> Submit </button>
      </LoginContainer>
    );
  }
}

export default Login;

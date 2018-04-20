import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import API_URL from "../../API";
import styled from "styled-components";

import Profile from './Profile'

const LoginContainer = styled.div`
  width: 60%;
  height: 3rem;
  border: 2px solid black;
  box-shadow 2px 2px whitesmoke;
  align-content: center;
`;

class Login extends Component {
  state = {
    user: "",
    loggedIn: false
  };

  handleClick = () => {
    this.setState({ loggedIn: !this.state.loggedIn });
    this.props.history.push({
      pathname: '/profile',
      state: {
        user: this.state.user
      }
    })
  };

  logout=()=>{
    this.setState({loggedIn: false, user: ''})
  }

  render() {
    // const Boxes = (
    return(
      <LoginContainer>
        <input
          placeholder="Full Name"
          onChange={e => this.setState({ user: e.target.value })}
        />
        <button onClick={this.handleClick}> Submit </button>
      </LoginContainer>
    );
    
    // if (!this.state.loggedIn) {
    //   return Boxes;
    // } else {
    //   return <Profile username={this.state.username} logout={this.logout}/>;
    // }
  }
}

export default withRouter(Login);

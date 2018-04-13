import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import API_URL from "../../API";
import styled from "styled-components";

import Profile from '../../components/Profile'

const LoginContainer = styled.div`
  width: 60%;
  height: 3rem;
  border: 2px solid black;
  box-shadow 2px 2px whitesmoke;
  align-content: center;
`;

class Login extends Component {
  state = {
    username: "",
    loggedIn: false
  };

  handleClick = () => {
    //get request and push to user trying to log in
    // fetch(
    //   `${API_URL}posts/1/comments`
    // )
    //   .then(response => response.json())
    //   .then(json => console.log(json));
    // this.props.history.push('/profile')

    this.setState({ loggedIn: !this.state.loggedIn });
  };

  logout=()=>{
    this.setState({loggedIn: false, username: ''})
  }

  render() {
    const Boxes = (
      <LoginContainer>
        <input
          placeholder="Full Name"
          onChange={e => this.setState({ username: e.target.value })}
        />
        <button onClick={this.handleClick}> Submit </button>
      </LoginContainer>
    );
    
    if (!this.state.loggedIn) {
      return Boxes;
    } else {
      return <Profile username={this.state.username} logout={this.logout}/>;
    }
  }
}

export default withRouter(Login);

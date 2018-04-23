import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, LoginContainer, Input } from '../styles'

const buttonStyle = {
  marginLeft: '95px'
}

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
    return(
      <LoginContainer>
        <Input
          placeholder="Full Name"
          onChange={e => this.setState({ user: e.target.value })}
        />
        <Button onClick={this.handleClick}  style={buttonStyle}> Submit </Button>
      </LoginContainer>
    );
  }
}

export default withRouter(Login);

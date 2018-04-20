import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import styled from "styled-components";

class OtherProfile extends Component {
  state= {
    user: {},
    currentUser: ''
  }

  componentWillMount() {
    console.log(this.props)
    fetch(`http://localhost:3000/people`)
      .then(response => response.json())
      // .then(json => console.log(json, this.props.username))
      .then(json =>
        json.find(elem => {
          return elem.name === this.props.location.state.otherUser;
        })
      )
      .then(foundUser => this.setState({ user: foundUser, currentUser: this.props.location.state.currentUser }));
  }

  logout=()=>{
    this.props.history.push('/')
  }

  changeView = () => {
    // localStorage.jwt = this.state.user.name;
    // this.setState({ main: !this.state.main });
    this.props.history.push({
      pathname: '/main',
      state: {
        user: this.state.currentUser
      }
    })
  };

  render(){
    return (
      <div>
        <button onClick={this.logout}>Logout</button>
        {/* <button onClick={this.changeView}>To Main</button> */}
        <img src={this.state.user.avatar}/>
      </div>
    )
  }
}

export default withRouter(OtherProfile)
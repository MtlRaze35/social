import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
class OtherProfile extends Component {
  state = {
    currentUser: {},
    viewUser: '',
    viewUserInfo: { id: -1 },
  }
  componentWillMount() {
    this.setState({ currentUser: this.props.location.state.currentUser, viewUser: this.props.location.state.viewUser })
    // console.log("this is the username of the person to view: ",this.props.location.state)
    fetch(`http://localhost:3000/people`)
      .then(response => response.json())
      // .then(json => console.log(json, this.props.username))
      .then(json =>
        json.find(elem => {
          return elem.name === this.state.viewUser;
        })
      )
      .then(foundUser => this.setState({ viewUserInfo: foundUser }));
  }
  logout = () => {
    this.props.history.push('/')
  }
  changeView = () => {
    this.props.history.push({
      pathname: '/main',
      state: {
        user: this.state.currentUser
      }
    })
  };
  render() {
    const { name, avatar } = this.state.viewUserInfo
    console.log(this.state)
    if (this.state.viewUserInfo.id < 0) return <div>Loading...</div>
    return (
      <div>
        <div>
          <button onClick={this.logout}>Logout</button>
          <button onClick={this.changeView}>To Main</button>
          <div>{name}</div>
          <img src={this.state.viewUserInfo.avatar} alt="broken" />
        </div>
        <div>
          <button>View Posts</button>
          <button>View Albums</button>
        </div>
      </div>
    )
  }
}
export default withRouter(OtherProfile)


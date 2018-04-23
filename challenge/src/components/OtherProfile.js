import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Posts from "./OtherProfilePosts"

class OtherProfile extends Component {
  state = {
    currentUser: {},
    viewUserInfo: {},
    toggle: "Posts"
  }

  componentWillMount() {
    this.setState({ currentUser: this.props.location.state.currentUser})
    fetch(`http://localhost:3000/people`)
      .then(response => response.json())
      .then(json =>
        json.find(elem => {
          return elem.name === this.props.location.state.viewUser;
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

  showProfile() {
    this.state.toggle === "Posts" ? this.setState({toggle: "Album"}) : this.setState({toggle: "Posts"})
  }

  render() {
    const { name, avatar } = this.state.viewUserInfo
    console.log(this.state)
    if (this.state.viewUserInfo.length === 0) return <div>Loading...</div>
    return (
      <div>
        <div>
          <button onClick={this.logout}>Logout</button>
          <button onClick={this.changeView}>To Main</button>
          <div>{name}</div>
          <img src={this.state.viewUserInfo.avatar} alt="loading" />
        </div>
        <div>
          Albums <button onClick={()=> this.showProfile()}>Toggle</button> Posts
          {this.state.toggle === "Posts" ? <Posts viewUser={this.state.viewUserInfo} user={this.state.currentUser}/> : <div>Hello</div>}
        </div>
      </div>
    )
  }
}

export default withRouter(OtherProfile)
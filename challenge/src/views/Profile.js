import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import ImageUploader from "../components/ImageUploader";
import UserPosts from "../components/UserPosts";
import UserAlbums from "../components/UserAlbums";
import Register from "./Register";
import Main from "./Main";

const ContentContainer = styled.div`
width: 60%;
border: 2px solid black;
box-shadow 2px 2px whitesmoke;
align-content: center;
`;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: false,
      user: {},
      views: true,
      main: false
    };
  }

  componentWillMount() {
    fetch(`http://localhost:3000/people`)
      .then(response => response.json())
      // .then(json => console.log(json, this.props.username))
      .then(json =>
        json.find(elem => {
          return elem.name === this.props.username;
        })
      )
      .then(foundUser => this.setState({ user: foundUser }));
  }

  register = () => {
    this.setState({ newUser: true });
  };

  changeView = () => {
    localStorage.jwt = this.state.user.name;
    this.setState({ main: !this.state.main });
  };

  toggleView = () => {
    this.setState({ views: !this.state.views });
  };

  render() {
    if (this.state.newUser === true) {
      return <Register />;
    }

    if (this.state.main) {
      return <Main toProfile={this.changeView} logout={this.props.logout} />;
    }

    if (!this.state.user) {
      return (
        <div>
          User Not Found
          <button onClick={this.props.logout}>Return</button>
          Have you Signed up?
          <button onClick={this.register}>Register here!</button>
        </div>
      );

      // if (!this.state.views) {
      //   <UserAlbums style={"display: none"} />;
      // } else {
      //   <UserPosts style={"display: none"} />;
      // }
      // if (this.state.user.avatar === null) {
      //   return <ImageUploader />;
      // }
    }
    return (
      <div>
        Hello {this.props.username}
        <img
          src={this.state.user.avatar ? this.state.user.avatar : null}
          alt="broken"
        />
        <button onClick={this.props.logout}>Logout</button>
        {this.state.user.avatar === null ? (
          <ImageUploader user={this.state.user} />
        ) : null}
        <button onClick={this.changeView}>To Main Page</button>
        <ContentContainer>
          View {this.state.views === false ? "Posts" : "Albums"}
          <button onClick={this.toggleView}>Toggle</button>
          {this.state.views === false ? (
            <UserAlbums user={this.state.user} id={this.state.user.id} />
          ) : (
            <UserPosts user={this.state.user} id={this.state.user.id} />
          )}
          {/* <UserAlbums user={this.state.user}/> 
          <UserPosts user={this.state.user}/> */}
        </ContentContainer>
      </div>
    );
  }
}

export default withRouter(Profile);

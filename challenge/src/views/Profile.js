import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import UserPosts from "../components/UserPosts";
import UserAlbums from "../components/UserAlbums";
import { Button, ContentContainer } from '../styles'
import API_URL from "../API";

const buttonStyle = {
  marginLeft: '33%'
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notFound: false,
      tab: "posts",
      user: {
        id: "",
        name: "",
        avatar: "",
        albums: [],
        posts: []
      },
      main: false,
      loading: true
    };
  }

  componentWillMount() {
    fetch(`${API_URL}/people`)
      .then(response => response.json())
      .then(peoples => {
        const userInfo = peoples.find(elem => {
          let name;
          typeof (this.props.location.state.user) === 'string' ? name = this.props.location.state.user :
            name = this.props.location.state.user.name;
          return elem.name === name
        });
        if (!userInfo) {
          this.setState({ notFound: true });
        } else {
          this.setState({
            user: userInfo
          });
        }
      });
  }

  toggle = tab => {
    this.setState({ tab });
  };

  changeView = () => {
    localStorage.jwt = this.state.user.name;
    
    this.setState({ main: !this.state.main });
    this.props.history.push({
      pathname: "/main",
      state: {
        user: this.state.user
      }
    });
  };

  toggleView = () => {
    this.setState({ views: !this.state.views });
  };

  logout = () => {
    this.props.history.push("/");
  };
  loaded = () => {
    this.setState({loading: false}) 
  }

  render() {
    
    if (this.state.notFound === true) {
      return (
        <div>
          User Not Found
          <Button onClick={this.logout}>Return</Button>
          Have you Signed up?
          <Button onClick={()=> this.props.history.push('/register')}>Register here!</Button>
        </div>
      );
    }
      
      if (this.state.loading === true && this.state.user.name.length){
          this.loaded()
      } 
      if (this.state.loading === true){
        return (
          <div>Loading</div>
        )
      }
      
      if (this.state.loading === false && this.state.user.name.length){
        const { user, tab } = this.state;
        const { name, albums, posts, avatar } = user;

        return (
      <div>
        <h1>{name}</h1>
        <img src={avatar} />
        <Button onClick={this.logout}>Logout</Button>
        {avatar && user ? <ImageUploader user={user} /> : null}
        <Button onClick={this.changeView}>To Main Page</Button>

        <ContentContainer>
          <div style={buttonStyle}>
            <Button onClick={() => this.toggle("albums")}>ALBUMS</Button>
            <Button onClick={() => this.toggle("posts")}>POSTS</Button>
          </div>
          {tab === "albums" 
            ? <UserAlbums albumIds={albums} user={this.state.user} />
            : <UserPosts postIds={posts} user={this.state.user} newPost={this.newPost} />
          }
        </ContentContainer>
      </div>
    );
  }
}
}

export default withRouter(Profile);

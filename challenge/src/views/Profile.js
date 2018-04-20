import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import ImageUploader from "../components/ImageUploader";
import UserPosts from "../components/UserPosts";
import UserAlbums from "../components/UserAlbums";
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
      loading: true,
      reRender: false
    };
  }

   componentWillMount() {
    fetch(`http://localhost:3000/people`)
    .then(response => response.json())
    .then(peoples => {
      const user = peoples.find(elem => {
        const { username } = this.props.location.state;

        return elem.name === username;
      });

      if (!user) {
        this.setState({ notFound: true });
      } else {
         this.setState({
          user
        });
      }
    });
  }

  // fetchUser = (update) => {
  //   const { id } = this.state.user
  //     if (id >= 0) {
  //       fetch(`http://localhost:3000/people/${id}`)
  //       .then(res => res.json())
  //       .then(user => {
  //         this.setState({
  //           user
  //         })
  //       })
  //     }

  //     if (update) {
  //       this.fetchPost();
  //     }
  // }

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
          <button onClick={this.logout}>Return</button>
          Have you Signed up?
          <button onClick={()=> this.props.history.push('/register')}>Register here!</button>
        </div>
      );
    }

    // if (this.state.main) {
    //   return <Main toProfile={this.changeView} logout={this.props.logout} />;
    // }

    // if (!this.state.views) {
    //   <UserAlbums style={"display: none"} />;
    // } else {
    //   <UserPosts style={"display: none"} />;
    // }
    // if (this.state.user.avatar === null) {
    //   return <ImageUploader />;
    // }

    const { user, tab } = this.state;
    const { name, id, albums, posts, avatar } = user;
      
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
        const { name, id, albums, posts, avatar } = user;

        return (
      <div>
        <div>{name}</div>
        <img src={avatar} alt="broken" />
        <button onClick={this.logout}>Logout</button>
        {avatar && user ? <ImageUploader user={user} /> : null}
        <button onClick={this.changeView}>To Main Page</button>

        <ContentContainer>
          {/* TODO: albums component that renders if albums.length other renders message */}
          <div>
            <button onClick={() => this.toggle("albums")}>ALBUMMS</button>
            <button onClick={() => this.toggle("posts")}>POSTS</button>
          </div>
          {tab === "albums" 
            ? <UserAlbums albumIds={albums} user={this.state.user} />
            : <UserPosts postIds={posts} user={this.state.user} newPost={this.newPost} />
          }
          {/* fetchPost={() => this.fetchUser(true)} */}

          {/* View {this.state.views === false ? "Posts" : "Albums"}
          <button onClick={this.toggleView}>Toggle</button>
          {this.state.views === false ? (
            <UserAlbums user={this.state.user} id={this.state.user.id} />
          ) : (
            <UserPosts user={this.state.user} id={this.state.user.id} />
          )}
          
           <UserAlbums user={this.state.user}/> 
          
          <UserPosts user={this.state.user}/>  */}
        </ContentContainer>
      </div>
    );
  }
}
}

export default withRouter(Profile);

import React, { Component } from "react";
import styled from "styled-components";
import NewPost from "./NewPost";

const AllPostsContainer = styled.div``;

const PostContainer = styled.div`
width: 60%;
border: 2px solid black;
box-shadow 2px 2px whitesmoke;
align-content: center;
`;

class UserPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: null,
      deleted: null
    };
  }

  // localhost:3000/posts?author=dre
  componentWillMount() {
    fetch(`http://localhost:3000/posts?author=${this.props.user.name}`)
      .then(response => response.json())
      .then(all => this.setState({ allPosts: all }));
  }

  componentWillReceiveProps(nextProps) {
    fetch(`http://localhost:3000/posts?author=${nextProps.user.name}`)
      .then(response => response.json())
      .then(all => this.setState({ allPosts: all }));
  }

  deletePost = postId => {
    console.log(postId);
    fetch(`http://localhost:3000/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(all => this.setState({deleted: !this.state.deleted}));
  };

  render() {
    return (
      <div>
        <NewPost user={this.props.user} />

        <AllPostsContainer>
          {this.state.allPosts
            ? this.state.allPosts.map(elem => {
                return (
                  <PostContainer key={elem.id}>
                    Title: {elem.title}, {elem.content}
                    <button onClick={() => this.deletePost(elem.id)}>
                      Delete post
                    </button>
                  </PostContainer>
                );
              })
            : null}
        </AllPostsContainer>
      </div>
    );
  }
}

export default UserPosts;

import React, { Component } from "react";
import styled from "styled-components";
import NewPost from "./NewPost";

// TODO: common variables in API.js and import when needed
const URL = 'http://localhost:3000';
const headers = {
  Accept: "application/json, text/plain, */*",
  "Content-type": "application/json; charset=UTF-8"
};


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
      posts: [],
      completed: false,
      deleted: null,
      reRender: 0
    };
  }
  
   componentWillMount()  {
    this.setState({posts: this.props.postIds})
  }

  // localhost:3000/posts?author=dre
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.postIds.length !== nextState.posts.length) {
  //     this.fetchPost();
  //     return true;
  //   }
  //   return false;
  // }



  // componentWillReceiveProps(nextProps) {
  //   fetch(`http://localhost:3000/posts?author=${nextProps.user.name}`)
  //     .then(response => response.json())
  //     .then(all => this.setState({ allPosts: all }));
  // }

  // deletePost = postId => {
  //   console.log(postId);
  //   fetch(`http://localhost:3000/posts/${postId}`, {
  //     method: "DELETE",
      
  //   })
  //     .then(response => response.json())
  //     .then(all => window.location.reload());
  // };

  fetchPost = () => {
    const { id } = this.state.posts
    const { postIds } = this.props.postIds
    
    const allPosts = [];
    const ids = this.props.postIds
    
    
    if (this.state.posts.length && this.state.completed === false) {

      ids.forEach((postID) => {
        fetch(`${URL}/posts/${postID}`)
          .then((response) => response.json())
          .then(post => {
              allPosts.push(post)
              if (allPosts.length === ids.length){
                this.setState({ posts: allPosts, completed: true })
              }
            })
          }); 
        }
  }
  // newPost = () => {
    // console.log('NEW ONE!')
    // this.setState({reRender: !this.state.reRender})
  // }

    renderPosts  = () => {
    this.fetchPost()
    return this.state.posts.map((post, idx) => {
      const { title, content, id } = post;
        
      return (
        <PostContainer key={idx}>
          <h3>{title}</h3>
          <p>{content}</p>
          <button>Show Comments</button>
        </PostContainer>
      )
    });
  }


  render() {
    const { postIds, user, fetchPost } = this.props;
    const { posts } = this.state;

    return (
      <div>
        <NewPost user={user} fetchPost={this.fetchPost} />
        {
          posts.length ? this.renderPosts() : <span>NO POSTS</span> 
        }
      </div>
    );
  }
}

export default UserPosts;

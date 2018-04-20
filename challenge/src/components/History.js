import React, { Component } from "react";
import styled from "styled-components";
import AllComments from "../components/AllComments";

const PostBox = styled.div`
 width: auto;
 height: auto;
 border: 2px solid black;
 box-shadow 2px 2px whitesmoke;
 align-content: center;
`;


export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      firstComment: {postID: null},
      id: ""
    };
  }
  // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps) return true
    //     return false
    // }
    leaveComment(id, body, author, authorID) {
      //replace localhost url by `https://my-json-server.typicode.com/MtlRaze35/social/comments/${obj.postId}`
      if (!body) {
      return;
    }
    
    // let postToUpdate;
    
    fetch(`http://localhost:3000/posts/${id}`)
      .then(response => response.json())
      .then(post => {
        if (!post.comments) {
          post.comments = [];
        }
        post.comments.push({ author, body, authorID, postID: id});
        const comments = post.comments;

        fetch(`http://localhost:3000/posts/${id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify({
            comments
          })
        });
      });
      // console.log(postToUpdate)
    }

  showComments = id => {
    console.log(id);
    // hides or reveals div
    let toShow = [];
    fetch(`http://localhost:3000/posts/${id}`)
    .then(resp => resp.json())
    .then(post => {
      if (!post.comments){
        return
      }
      this.setState({ 
        comments: post.comments, 
        firstComment: post.comments[0]
      });
      // this.renderComments(post.comments)
    });

    // if (this.state.comments !== []){
    // return ( <AllComments postID={id} toShow={this.state.comments} /> )
    // }
    
  };
  
  renderComments = comments => {
    // console.log(this.state)
    // const { body, author} = this.state.comments
  };
  
  render() {
   

    let currentMessage;
    if (!this.props.posts) return <div>Loading Messages</div>;


    return this.props.posts.map(post => {

      return (
        <PostBox key={post.id}>
          <p>
            {post.title}, {post.content}
          </p>
          
          
          <button onClick={() => this.showComments(post.id)}>
            Show Comments
          </button>
          
          {this.state.comments !== [] ? this.state.firstComment.postID === post.id ?
            <AllComments postID={post.id} toShow={this.state.comments} />
           : null : null}

          <input onChange={e => (currentMessage = e.target.value)} />
          <button
            onClick={() =>
              this.leaveComment(
                post.id,
                currentMessage,
                this.props.user.name,
                this.props.user.id
              )
            }
          >
            Add Comment
          </button>
          <button onClick={() => console.log(this.state)}> test </button>
        </PostBox>
      );
    });
  }
}

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
      id: ""
    };
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //     if (nextProps) return true
  //     return false
  // }
  leaveComment(id, comment, author) {
    //replace localhost url by `https://my-json-server.typicode.com/MtlRaze35/social/comments/${obj.postId}`
    fetch(`http://localhost:3000/comments/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        comment,
        postId: id,
        author
      })
    })
      .then(response => response.json())
      .then(commentObj => console.log(commentObj));
  }
  showComments = id => {
    // hides or reveals div
    let toShow = [];
    fetch(`http://localhost:3000/comments`)
      .then(resp => resp.json())
      //  .then(all => console.log(all))
      .then(all =>
        all.map(elem => {
          if (id === elem.postId) {
            toShow.push(elem);
          }
        })
      )
      .then(all => this.setState({ comments: toShow }));
    //  .then(all => console.log(toShow))
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
          {this.state.comments.length ? this.state.comments[0].postId === post.id ? <AllComments toShow={this.state.comments} /> : null : null}
          <input onChange={e => (currentMessage = e.target.value)} />
          <button
            onClick={() =>
              this.leaveComment(post.id, currentMessage, post.author)
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

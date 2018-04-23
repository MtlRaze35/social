import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AllComments from "../components/AllComments";
import { Button, PostContainer, PostBox } from '../styles'
import API_URL from "../API";


class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      firstComment: { postID: null },
      id: "",
      postID: null
    };
  }

  showComments = id => {
    fetch(`${API_URL}/posts/${id}`)
      .then(resp => resp.json())
      .then(post => {
        this.setState({
          comments: post.comments,
          postID: id
        });
      });
  };

  hideComments() {
    this.setState({ comments: [], postID: null })
  }

  goToOtherUser(viewUser) {
    this.props.history.push({
      pathname: "/otherUser",
      state: {
        viewUser,
        currentUser: this.props.user
      }
    })
  }

  render() {
    if (!this.props.posts) return <div>Loading Messages</div>;

    return this.props.posts.map(post => {

      return (
        <PostBox key={post.id}>
          <PostContainer>
            <h2>{post.title}</h2> {post.content}
            <p className="user-link" onClick={() => this.goToOtherUser(post.author)}>{post.author}</p>
          </PostContainer>
          <div>
          <Button onClick={() => this.showComments(post.id)}>Show Comments</Button>
          <Button onClick={() => this.hideComments()}> Hide Comments</Button>
          </div>
          {this.state.postID === post.id ?  <AllComments postID={post.id} toShow={this.state.comments} user={this.props.user} /> 
          : null}
        </PostBox>
      );
    });
  }
}

export default withRouter(History)
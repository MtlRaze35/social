import React, { Component } from "react";
import styled from "styled-components";
import API_URL from "../API";

const NewPostContainer = styled.div``;

class NewPost extends Component {
  state = {
    title: null,
    content: null
  };

  submitPost = () => {
    const { content, title } = this.state;
    const { user } = this.props;

    if (!content || !title) {
      return;
    }

    const post = {
      content,
      title,
      user: user.id,
      author: user.name
    };

    fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(post)
    }).then(() => {
      fetch(`${API_URL}/posts`)
        .then(response => response.json())
        .then(posts => {
          const postsId = posts
            .filter(remotePost => remotePost.user === user.id)
            .map(x => x.id);

          fetch(`${API_URL}/people/${user.id}`, {
            method: "PUT",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
              ...user,
              posts: postsId
            })
          });
        });
    });

    this.setState({
      title: "",
      content: ""
    });
    this.props.fetchPost();
  };

  render() {
    return (
      <NewPostContainer>
        <input
          placeholder="New Post Title"
          onChange={e => this.setState({ title: e.target.value })}
        />
        <input
          placeholder="Content"
          onChange={e => this.setState({ content: e.target.value })}
        />
        <button onClick={this.submitPost}>Submit</button>
      </NewPostContainer>
    );
  }
}

export default NewPost;

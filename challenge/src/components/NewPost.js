import React, { Component } from "react";
import styled from "styled-components";

const NewPostContainer = styled.div``;

class NewPost extends Component {
  state = {
    newTitle: null,
    newContent: null
  };

  submitPost = () => {
    fetch(`http://localhost:3000/posts`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ content: this.state.newContent, title: this.state.newTitle, author: this.props.user.name })
      })
        .then(response => response.json())
        .then(all => console.log(all));
  };

  render() {
    return (
      <NewPostContainer>
        <input
          placeholder="New Post Title"
          onChange={e => this.setState({ newTitle: e.target.value })}
        />
        <input
          placeholder="Content"
          onChange={e => this.setState({ newContent: e.target.value })}
        />
        <button onClick={this.submitPost}>Submit</button>
      </NewPostContainer>
    );
  }
}

export default NewPost;

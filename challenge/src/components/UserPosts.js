import React, { Component } from "react";
import NewPost from "./NewPost";
import { PostContainer, Button } from "../styles";
import API_URL from "../API";

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

  componentWillMount() {
    this.setState({ posts: this.props.postIds });
  }

  fetchPost = () => {
    const allPosts = [];
    const ids = this.props.postIds;

    if (this.state.posts.length && this.state.completed === false) {
      ids.forEach(postID => {
        fetch(`${API_URL}/posts/${postID}`)
          .then(response => response.json())
          .then(post => {
            allPosts.push(post);
            if (allPosts.length === ids.length) {
              this.setState({ posts: allPosts, completed: true });
            }
          });
      });
    }
  };

  renderPosts = () => {
    this.fetchPost();
    return this.state.posts.map((post, idx) => {
      const { title, content } = post;

      return (
        <PostContainer key={idx}>
          <h3>{title}</h3>
          <p>{content}</p>
          <Button>Show Comments</Button>
        </PostContainer>
      );
    });
  };

  render() {
    const { user } = this.props;
    const { posts } = this.state;

    return (
      <div>
        <NewPost user={user} fetchPost={this.fetchPost} />
        {posts.length ? this.renderPosts() : <span>NO POSTS</span>}
      </div>
    );
  }
}

export default UserPosts;

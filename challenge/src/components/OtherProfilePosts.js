import React, { Component } from "react";
import AllComments from './AllComments'
import API_URL from "../API";

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }
    componentWillMount() {
        let allUserPosts = []
        fetch(`${API_URL}/posts`)
            .then(response => response.json())
            .then(posts => posts.map(post => {
                if (post.user === this.props.viewUser.id) {
                    console.log("im here")
                    allUserPosts.push(post)
                    this.setState({ posts: allUserPosts })
                }
                return allUserPosts
            }))
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
    

    render() {
        if (this.state.posts.length === 0) return <div>Loading...<button onClick={() => console.log(this.state)}>test</button></div>
        return this.state.posts.map(post => {
            return (
                <div>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <button onClick={() => this.showComments(post.id)}>Show Comments</button>
                <button onClick={() => this.hideComments()}>Hide Comments</button>
                {this.state.postID === post.id ? <AllComments postID={post.id} toShow={this.state.comments} user={this.props.user} />
            : null}
                </div>
            )
        })
    }
}
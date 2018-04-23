import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {CommentContainer, Input, Button} from '../styles'
import API_URL from "../API";


class AllComments extends Component {
  state = {
    toShow: [],
    user: {}
  };

  componentWillMount() {
    this.setState({ toShow: this.props.toShow, user: this.props.user })
  }

  goToOtherUser(viewUser) {
    this.props.history.push({
      pathname: "/otherUser",
      state: {
        viewUser,
        currentUser: this.props.location.state.user
      }
    })
  }
  
  leaveComment(message) {
    const id = this.props.postID
    if (!message) {
      return;
    }
    fetch(`${API_URL}/posts/${id}`)
      .then(response => response.json())
      .then(post => {
        if (!post.comments) {
          post.comments = [];
        }
        post.comments.push({ author: this.state.user.name, body: message, authorID: this.state.user.id, postID: id});
        const comments = post.comments;

        fetch(`${API_URL}/posts/${id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify({
            comments
          })
        })
        .then(() => this.setState({toShow: [...comments]}))
      });
      
  }

  render() {
    let currentMessage;
    //waits for the props to load up
    if(!this.props.user) return <div>Loading!</div>
    //if there are no comments, only the leave comment div will be displayed
    if(typeof(this.state.toShow) === "undefined") return ( <div>
    <Input onChange={e => currentMessage = e.target.value}></Input>
    <Button onClick={() => this.leaveComment(currentMessage)}>Send Comment</Button>
    </div>)
    //if everything is populated, it will rended and allow the update of comments
    return (
      <div>
        {this.state.toShow.map((elem, idx) => {
          return (
            <CommentContainer key={idx}>
              {typeof(elem.body) !== "undefined" ? <p>{elem.body}</p> : <p>Loading</p>}
              <p className="user-link" onClick={() => this.goToOtherUser(elem.author)} >{elem.author}</p>
            </CommentContainer>
          );
        })}
        <div>
          <Input onChange={e => currentMessage = e.target.value}></Input>
          <Button onClick={() => this.leaveComment(currentMessage)}>Send Comment</Button>
        </div>  
      </div>
    );
  }
}

export default withRouter(AllComments);
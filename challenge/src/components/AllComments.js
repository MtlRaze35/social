import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import OtherProfile from "./OtherProfile";

const CommentContainer = styled.div`
display: flex;
justify-content: space-between;
border-bottom-style: ridge;

`;

const Author = styled.div`
  cursor: pointer;
`;

class AllComments extends Component {
  state = {
    viewingOther: null,
    otherProfile: ""
  };

  // viewProfile = user => {
  //   console.log('Clicked')
  //   this.setState({ otherProfile: user });
  //   this.setState({ viewingOther: true });
  //   console.log(this.state)
  //   console.log(this.props.location)
  //   // this.props.history.push('/otherUser')

  //   this.props.history.push({
  //     pathname: '/otherUser',
  //     state: {
  //       otherUser: user,
  //       currentUser: this.props.location.state.username
  //     }
  //   })
  // };

  render() {
    // this.state.viewingOther ? (
    //   <OtherProfile user={this.state.otherProfile} />
    // ) : null;

    // if (this.state.viewingOther){
    //   return(<OtherProfile user={this.state.otherProfile}/>)
    // }

    // console.log(comments)

    console.log(this.props.toShow);
    console.log(this.props);
    return (
      <div>
        {this.props.toShow.map((elem, idx)=> {
          // if (this.props.PostID === elem.postID) {
          //   return (
          //     <CommentContainer>
          //       <div>{elem.body}</div>
          //       {/* <Author onClick={() => this.viewProfile(elem.author)}>
          //         {elem.author}
          //       </Author> */}
          //     </CommentContainer>
          //   );
          // }

          return (
            <CommentContainer key={idx}>
              <p>{elem.body}</p>
              <p>{elem.author}</p>
              {/* <Author onClick={() => this.viewProfile(elem.author)}>
                {elem.author}
              </Author> */}
            </CommentContainer>
          );
        })}
      </div>
    );
  }
}

export default withRouter(AllComments);

// import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
// import styled from "styled-components";

// import OtherProfile from "./OtherProfile";

// const CommentContainer = styled.div`
// display: flex;
// justify-content: space-between;
// border-bottom-style: ridge;

// `;

// const Author = styled.div`
//   cursor: pointer;
// `;

// class AllComments extends Component {
//   state = {
//     viewingOther: null,
//     otherProfile: ""
//   };

//   render() {


//     console.log(this.props.toShow);
//     console.log(this.props);
//     return (
//       <div>
//         {this.props.toShow.map((elem, idx)=> {

//           return (
//             <CommentContainer key={idx}>
//               <p>{elem.body}</p>
//               <p>{elem.author}</p>
//             </CommentContainer>
//           );
//         })}
//       </div>
//     );
//   }
// }
// export default withRouter(AllComments);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
// import "./otherUser/otherUser.css";

const CommentContainer = styled.div`
display: flex;
justify-content: space-between;
border-bottom-style: ridge;
`;

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
       currentUser: this.props.location.state
     }
   })
 }
 //make sure to pass the current user info in History as props
 leaveComment(message) {
   const id = this.props.postID
   if (!message) {
     return;
   }
   fetch(`http://localhost:3000/posts/${id}`)
     .then(response => response.json())
     .then(post => {
       if (!post.comments) {
         post.comments = [];
       }
       post.comments.push({ author: this.state.user.name, body: message, authorID: this.state.user.id, postID: id});
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
       })
       .then(() => this.setState({toShow: [...comments]}))
     });
 }

 render() {
   let currentMessage
   // console.log('this is AllComments props: ',this.props.location.state)
   if(!this.props.user) return <div>Loading!</div>
   return (
     <div>
       {this.state.toShow.map((elem, idx) => {
         return (
           <CommentContainer key={idx}>
             <p>{elem.body}</p>
             <p className="user-link" onClick={() => this.goToOtherUser(elem.author)} >{elem.author}</p>
           </CommentContainer>
         );
       })}
       <div>
         <input onChange={e => currentMessage = e.target.value}></input>
         <button onClick={() => this.leaveComment(currentMessage)}>Send Comment</button>
       </div>  
     </div>
   );
 }
}

export default withRouter(AllComments);

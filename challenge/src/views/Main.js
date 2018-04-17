// import React, { Component } from "react";

// class Main extends Component {
//   test = () => {
//     console.log(localStorage);
//   };
//   render() {
//     return (
//       <div>
//         Im The Main Page
//         <button onClick={this.props.toProfile}> To Profile </button>
//         <button onClick={this.test}>Test</button>
//       </div>
//     );
//   }
// }

// export default Main;

import React, { Component } from "react";

import History from "../components/History";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    fetch("http://localhost:3000/posts")
      .then(request => request.json())
      .then(posts => this.setState({ posts }));
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.props.logout}>Logout</button>
          <button onClick={this.props.toProfile}> To Profile </button>
          {/* <Profile/> */}
        </div>
        <div>
          <History posts={this.state.posts} />
        </div>
      </div>
    );
  }
}

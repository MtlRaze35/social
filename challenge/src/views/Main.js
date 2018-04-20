import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import History from "../components/History";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
  }
  componentWillMount() {
    this.setState({user: this.props.location.state.user})
  
    fetch("http://localhost:3000/posts")
      .then(request => request.json())
      // .then(all => console.log(this.props.location.state))
      .then(posts => this.setState({ posts }));
  }

  handleClick = () => {
    console.log(this.state)
    // this.props.history.push('/profile')

    this.props.history.push({
      pathname: '/profile',
      state: {
        user: this.state.user
      }
    })
  }

  logout=()=>{
    this.props.history.push('/')
  }

  test = () => {
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.test}>test</button>
          <button onClick={this.logout}>Logout</button>
          <button onClick={this.handleClick }> To Profile </button>
          {/* <Profile/> */}
        </div>
        <div>
          <History posts={this.state.posts} user={this.state.user} />
        </div>
      </div>
    );
  }
}

export default withRouter(Main);

import React, { Component } from "react";
import API_URL from "../API";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: "",
      user: {}
    };
  }
  // this.setState({user: })
  componentWillMount() {
    fetch(`http://localhost:3000/people`)
      .then(response => response.json())
      // .then(json => console.log(json, this.props.username))
      .then(json =>
        json.find(elem => {
          return elem.name === this.props.username;
        })
      )
      .then(foundUser => this.setState({ user: foundUser }));
  }

  render() {
    if (this.state.username === "") {
      return <div>Bye</div>;  
    }
    
    console.log(this.state.username);
    console.log(this.state.user);

    if (!this.state.user){
      return (
        <div>
          User Not Found
          <button onClick={this.props.logout}>Return</button>
          Have you Signed up?
          <button>Register here!</button>
        </div>
      )
    }
    return (
      <div>
        Hello {this.props.username}
        <img src={this.state.user.avatar}/>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}

export default withRouter(Profile);

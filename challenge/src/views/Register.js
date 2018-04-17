import React, { Component } from "react";

class Register extends Component {
  state = {
    newUser: ''
  }

  signUp = () =>{
    console.log(this.state)
    fetch('http://localhost:3000/people',{
      method:'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ name: this.state.newUser, avatar: null })
    })
    .then(response => response.json())
    .then(all => alert("Registered successfully"))
    .then(ans => window.location.reload())
  }
  
  
  
  render() {
  
    return (
      <div>
        This will be your login info!
        <input placeholder="Full Name" onChange={(e) => this.setState({newUser: e.target.value})} />
        <button onClick={this.signUp}>Sign Up!</button>
      </div>
    );
  }
}

export default Register;

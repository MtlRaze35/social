import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from '../styles'
import History from "../components/History";
import  API_URL  from "../API";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
  }
  componentWillMount() {
    this.setState({user: this.props.location.state.user})
  
    fetch(`${API_URL}/posts`)
      .then(request => request.json())
      .then(posts => this.setState({ posts: posts.reverse() }));
  }

  handleClick = () => {
    this.props.history.push({
      pathname: '/profile',
      state: {
        user: this.state.user
      }
    })
  }

  logout=()=>{
    this.setState({user: ''})
    this.props.history.push('/')
  }


  render() {
    return (
      <div>
        <div>
          <Button onClick={this.logout}>Logout</Button>
          <Button onClick={this.handleClick }> To Profile </Button>
        </div>
        <div>
          <History posts={this.state.posts} user={this.state.user} />
        </div>
      </div>
    );
  }
}

export default withRouter(Main);

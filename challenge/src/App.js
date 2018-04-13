import React, { Component } from "react";
import {withRouter} from "react-router-dom"; 

import Login from './views/login' 

class App extends Component {
  render() {
    return (
      <div className="App">
          <Login props={this.props}/>
      </div>
    );
  }
}

export default withRouter(App);


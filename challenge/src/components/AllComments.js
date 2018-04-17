import React, { Component } from "react";

class AllComments extends Component {
  render(){
    console.log(this.props.toShow)
    return(
      <div>{this.props.toShow[0].body}</div>
    )
  }
}

export default AllComments
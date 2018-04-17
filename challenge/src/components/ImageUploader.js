import React, { Component } from "react";

class ImageUploader extends Component {
  state = {
    selectedFile: null,
    user: {}
  };

  fileSelectedHandler = event => {

    this.setState({ selectedFile: event.target.files[0], user: this.props.user});
    // this.setState({ user: myUser });

  };

  fileUploadHandler = () => {
    fetch(`http://localhost:3000/people/${this.state.user.id}`,{
      method:'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({name: this.state.user.name, avatar: this.state.selectedFile })
    })
    .then(response => response.json())
    .then(resp => console.log(resp))
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <input type="file" onChange={(e) => this.fileSelectedHandler(e)} />
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    );
  }
}

export default ImageUploader;

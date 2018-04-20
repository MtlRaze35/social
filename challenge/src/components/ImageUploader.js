import React, { Component } from "react";

class ImageUploader extends Component {
  state = {
    selectedFile: null,
    user: {}
  };

  fileSelectedHandler = event => {
    const reader = new FileReader();
    const file = event.target.files[0];
    
    reader.addEventListener("load", () => {
       this.setState({
         selectedFile: reader.result
       });
    });

    if (file) {
      reader.readAsDataURL(file)
    }
  };

  fileUploadHandler = () => {

    fetch(`http://localhost:3000/people/${this.props.user.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        name: this.state.user.name,
        avatar: this.state.selectedFile
      })
    }).catch(e => console.log(e, 'malaka'))
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <input type="file" ref="input" onChange={e => this.fileSelectedHandler(e)} />
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    );
  }
}

export default ImageUploader;

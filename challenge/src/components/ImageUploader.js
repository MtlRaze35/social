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

    // ${this.props.user.id}
    fetch(`http://localhost:3000/albums/`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        name: this.props.user.name,
        userID: this.props.user.id,
        photo: this.state.selectedFile
      })
    }).catch(e => console.log(e, 'malaka'))
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <input type="file" ref="input" onChange={e => this.fileSelectedHandler(e)} />
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    );
  }
}

export default ImageUploader;

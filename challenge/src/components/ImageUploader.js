import React, { Component } from "react";
import API_URL from "../API";

class ImageUploader extends Component {
  state = {
    selectedFile: null,
    title: '',
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
      reader.readAsDataURL(file);
    }
  };

  fileUploadHandler = () => {
    const { name } = this.props.user;
    const { user } = this.props;

    if (!this.state.selectedFile || !this.state.title) {
      return;
    };

    // ${this.props.user.id}
    fetch(`${API_URL}/albums/`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        name: this.props.user.name,
        userID: this.props.user.id,
        title: this.state.title,
        photo: this.state.selectedFile
      })
    })
      .then(() => {
        fetch(`${API_URL}/albums`)
          .then(response => response.json())
          .then(albums => {
            const albumId = albums.filter((remoteAlbum) => remoteAlbum.name === name)
              .map((x) => x.id);

            fetch(`${API_URL}/${this.props.user.id}`, {
              method: "PUT",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-type": "application/json; charset=UTF-8"
              },
              body: JSON.stringify({
                ...user,
                albums: albumId
              })
            });
          });
      })
    }


  render() {
    return (
      <div>
        <input
          type="file"
          onChange={e => this.fileSelectedHandler(e)}
        />
        <input type='text' placeholder="Photo Title" onChange={(e)=> this.setState({title: e.target.value})}/> 
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    );
  }
}

export default ImageUploader;

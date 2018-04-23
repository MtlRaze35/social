import React, { Component } from "react";
import ImageUploader from "./ImageUploader";


class NewAlbum extends Component {
  render() {
    return(
    <div>
      <ImageUploader user={this.props.user} />
    </div>
    )
  }
}

export default NewAlbum;

import React, { Component } from "react";
import styled from "styled-components";
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

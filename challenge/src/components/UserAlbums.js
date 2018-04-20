import React, { Component } from "react";
import styled from 'styled-components';

import NewAlbum from './NewAlbum';

// const AlbumsContainer = styled.div`
// width: 60%;
// border: 2px solid black;
// box-shadow 2px 2px whitesmoke;
// align-content: center;
// `;

class UserAlbums extends Component {
  render() {
    return (
      <div>
        <button onClick={this.viewPhoto}></button>
        <NewAlbum user={this.props.user}/>
      </div>
    )
  }
}

export default UserAlbums
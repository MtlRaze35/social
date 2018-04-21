import React, { Component } from "react";
import styled from "styled-components";

import NewAlbum from "./NewAlbum";

const ImageContainer = styled.img`
  max-width: 300px;
  max-height: 300px;
`;

// const AlbumsContainer = styled.div`
// width: 60%;
// border: 2px solid black;
// box-shadow 2px 2px whitesmoke;
// align-content: center;
// `;

class UserAlbums extends Component {
  state = {
    user: {},
    image: [],
    newAlb: false
  };

  componentWillMount = () => {
    this.setState({ user: this.props.user });
    this.fetchPhotos()
  };

  fetchPhotos = () => {

    const albumIds  = this.props.user.albums;
    let foundImg = [];
    // const Obj = {}

    console.log(albumIds)
    albumIds.forEach(id => {
      fetch(`http://localhost:3000/albums/${id}`)
      .then(resp => resp.json())
      .then(img => {
        let Obj = {
          photo: img.photo,
          title: img.title
        };
        foundImg.push(Obj);
        console.log(foundImg)
        this.setState({ image: foundImg })
      });
    });
    // setTimeout(()=> 1000)
  };
  
  
  viewPhotos = () => {
    
    console.log(this.state)
    // <div>{this.state.image[0].title}</div>

    return <ImageContainer src={this.state.image[0].photo}/>
  };

  render() {
    console.log(this.state)
    const { name, id, albums } = this.props.user;
    // if (this.state.newAlb === true) {
    //   return (
    //     <div>
    //       <NewAlbum user={this.props.user} />
    //     </div>
    //   );
    // } else {
      return (
        <div>
          {this.state.image ? <ImageContainer src={this.state.image} /> : null}
          <button onClick={() => this.setState({ newAlb: true })}>
            New Album
          </button>
          <button onClick={this.viewPhoto}>View Albums</button>
          {this.state.image.length ? this.viewPhotos() : <div>Nothing to show</div>}
        </div>
      );
    }
  }


export default UserAlbums;

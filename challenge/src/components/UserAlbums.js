import React, { Component } from "react";
import NewAlbum from "./NewAlbum";
import API_URL from "../API";
import { ImageContainer } from "../styles";

class UserAlbums extends Component {
  state = {
    user: {},
    image: [],
    newAlb: false
  };

  componentWillMount = () => {
    this.setState({ user: this.props.user });
    this.fetchPhotos();
  };

  fetchPhotos = () => {
    const albumIds = this.props.user.albums;
    let foundImg = [];

    albumIds.forEach(id => {
      fetch(`${API_URL}/albums/${id}`)
        .then(resp => resp.json())
        .then(img => {
          let Obj = {
            photo: img.photo,
            title: img.title
          };
          foundImg.push(Obj);
          this.setState({ image: foundImg });
        });
    });
  };

  render() {
    if (this.state.newAlb === true) {
      return (
        <div>
          <NewAlbum user={this.props.user} />
        </div>
      );
    } else {
      return (
        <div>
          {this.state.image ? <ImageContainer src={this.state.image} /> : null}
          <button onClick={() => this.setState({ newAlb: true })}>
            New Album
          </button>
          <button onClick={this.viewPhoto}>View Albums</button>
          {this.state.image.length ? (
            this.state.image.map(elem => {
              return (
                <div>
                  <h3>{elem.title}</h3>
                  <ImageContainer src={elem.photo} />
                </div>
              );
            })
          ) : (
            <div>Nothing to show</div>
          )}
        </div>
      );
    }
  }
}

export default UserAlbums;

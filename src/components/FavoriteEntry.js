import React, { Component } from 'react';
import FavoriteStarIcon from "./FavoriteStarIcon";
import FavoriteTitle from "./FavoriteTitle";

class FavoriteEntry extends Component {
  render() {
    return (
      <div>
        FavoriteEntry

        <FavoriteStarIcon />
        <FavoriteTitle />

      </div>
    );
  }
}

export default FavoriteEntry;
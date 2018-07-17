import React, { Component } from 'react';

/* global chrome */
class FavoriteStarIcon extends Component {

  render() {
    return (
        <span
          className={`star ${this.props.item.isFavorite}`}
          onClick={()=>this.props.starLighting(this.props.index)}
        >
          &#9733;
        </span>
    );

  }
}


export default FavoriteStarIcon;
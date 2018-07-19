import React, { Component } from 'react';

/* global chrome */
class FavoriteTitle extends Component {

  render() {
    return (
      <div className="favorite-title">

        <a href={this.props.linkUrl}  target="_blank" >
          {`${this.props.index+1}. ${this.props.item.title}`}
        </a>

      </div>
    );
  }
}

export default FavoriteTitle;
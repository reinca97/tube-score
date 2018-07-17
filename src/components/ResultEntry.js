import React, { Component } from 'react';
import FavoriteStarIcon from './FavoriteStarIcon'
import FavoriteTitle from './FavoriteTitle'


/* global chrome */
class ResultEntry extends Component {

  render() {
    return (
      <div className="result-entry">

        <FavoriteStarIcon
          item={this.props.item}
          index={this.props.index}
          starLighting={this.props.starLighting}
        />

        <FavoriteTitle
          linkUrl={this.props.linkUrl}
          index={this.props.index}
          item={this.props.item}
        />

      </div>
    );

  }
}

export default ResultEntry;
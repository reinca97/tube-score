import React, { Component } from 'react';
import FavoriteSearch from "./FavoriteSearch";
import FavoriteList from "./FavoriteList";

class Favorite extends Component {
  render() {
    return (
      <div>

        <h1 className="back-to-main" onClick={this.props.returnToMain}>
          TubeScore
        </h1>

        <h3>Favorite</h3>

        <FavoriteSearch
          getInputText={this.props.getInputText}
        />

        <FavoriteList
          starLighting={this.props.starLighting}
          viewMore={this.props.viewMore}
          favoriteItems={this.props.favoriteItems}
          popUpScore={this.props.popUpScore}
        />

      </div>
    );
  }
}

export default Favorite;
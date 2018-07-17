import React, { Component } from 'react';
import FavoriteSearch from "./FavoriteSearch";
import FavoriteList from "./FavoriteList";

class Favorite extends Component {
  render() {
    return (
      <div>
        <h3 className="favorite">Favorite</h3>

        <FavoriteSearch
          getInputText={this.props.getInputText}
        />
        <FavoriteList />

      </div>
    );
  }
}

export default Favorite;
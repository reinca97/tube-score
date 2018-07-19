import React, { Component } from 'react';
import FavoriteEntry from "./FavoriteEntry";


class FavoriteList extends Component {
  render() {
    return (
      <div className="favorite-list">
        { this.props.favoriteItems&&
          this.props.favoriteItems.map((item,index)=>{
            return(
              <FavoriteEntry
                starLighting={this.props.starLighting}
                item={item}
                index={index}
                linkUrl={String(item.link)}
              />
            )
          })
        }


      </div>
    );
  }
}

export default FavoriteList;
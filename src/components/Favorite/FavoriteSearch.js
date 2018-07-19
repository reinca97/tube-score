import React, { Component } from 'react';

class FavoriteSearch extends Component {
  constructor(props){
    super(props)
  }

  onGetInputText=(ev)=>{
    this.props.getInputText(ev.target.value)
  };

  render() {
    return (
      <div>

        <input
          type="text"
          onChange={this.onGetInputText}
          className="search-input"
          placeholder="Search in my Favorite list"
        />


      </div>
    );
  }
}

export default FavoriteSearch;
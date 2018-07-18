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
          placeholder="즐겨찾기 내부 검색"
        />


      </div>
    );
  }
}

export default FavoriteSearch;
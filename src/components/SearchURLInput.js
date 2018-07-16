import React, { Component } from 'react';

class SearchURLInput extends Component {
  constructor(props){
    super(props)
  }

  onGetInputURL=(ev)=>{
    this.props.getInputURL(ev.target.value)
  };

  render() {
    return (
      <div className="search-url-input">

        <input
          type="text"
          onChange={this.onGetInputURL}
          className="search-input"
          placeholder="YOUTUBE URL을 입력하세요"
        />

      </div>


    );
  }
}

export default SearchURLInput;
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
          placeholder="Please input a YOUTUBE URL"
        />

      </div>


    );
  }
}

export default SearchURLInput;
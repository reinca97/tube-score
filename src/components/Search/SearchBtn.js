import React, { Component } from 'react';

class SearchBtn extends Component {


  render() {
    return (
      <div className="search-btn-comp">

        <button
          className={this.props.isYoutubeUrl? ("search-btn"):("search-btn dis")}
          disabled={!this.props.isYoutubeUrl}
          onClick={this.props.onSearchScore}
        >
          {this.props.searchBtnText}
        </button>

      </div>


    );
  }
}

export default SearchBtn;
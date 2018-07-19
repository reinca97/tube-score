import React, { Component } from 'react';
import SearchInThisPage from "./SearchInThisPage";
import SearchOtherURL from "./SearchOtherURL"

class Search extends Component {
  render() {
    return (
      <div className="search">

        <SearchInThisPage
          onSearchThisScore={this.props.onSearchThisScore}
          isYoutubeUrlTap={this.props.isYoutubeUrlTap}
          videoTitleTap={this.props.videoTitleTap}
        />

        <div className="search-or">or</div>

        <SearchOtherURL
          getInputURL={this.props.getInputURL}
          onSearchOtherScore={this.props.onSearchOtherScore}
          isYoutubeUrlOut={this.props.isYoutubeUrlOut}
          videoTitleOut={this.props.videoTitleOut}
        />

      </div>


    );
  }
}

export default Search;
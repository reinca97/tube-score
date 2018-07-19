import React, { Component } from 'react';
import SearchURLInput from './SearchURLInput'
import MovieTitle from './MovieTitle'
import SearchBtn from './SearchBtn'

class SearchOtherURL extends Component {
  render() {
    return (
      <div className="search-other-url">
        {/*props 이름 변경 금지*/}
        <SearchURLInput
          getInputURL={this.props.getInputURL}
        />

        <MovieTitle
          isYoutubeUrl={this.props.isYoutubeUrlOut}
          videoTitle={this.props.videoTitleOut}
        />

        <SearchBtn
          searchBtnText="URL로 악보 찾기"
          onSearchScore={this.props.onSearchOtherScore}
          isYoutubeUrl={this.props.isYoutubeUrlOut}
        />

      </div>


    );
  }
}

export default SearchOtherURL;
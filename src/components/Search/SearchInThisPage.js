import React, { Component } from 'react';
import MovieTitle from "./MovieTitle";
import SearchBtn from "./SearchBtn";

class SearchInThisPage extends Component {
  render() {
    return (
      <div className="search-in-this-page">
        {/*props 이름 변경 금지*/}
        <MovieTitle
          isYoutubeUrl={this.props.isYoutubeUrlTap}
          videoTitle={this.props.videoTitleTap}
        />

        <SearchBtn
          searchBtnText="현재 페이지의 악보 찾기"
          onSearchScore={this.props.onSearchThisScore}
          isYoutubeUrl={this.props.isYoutubeUrlTap}
        />

      </div>


    );
  }
}

export default SearchInThisPage;
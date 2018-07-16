import React, { Component } from 'react';

class MovieTitle extends Component {
  render() {
    return (
      <div className="movie-title">

        {
          this.props.isYoutubeUrl&&
            <h3>{this.props.videoTitle}</h3>
        }


      </div>


    );
  }
}

export default MovieTitle;
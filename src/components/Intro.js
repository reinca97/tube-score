import React, { Component } from 'react';

class Intro extends Component {
  render() {

    return (
      <div className="intro">
        <h1>TubeScore</h1>

        <ul className="intro-select">

          <h2>I want to search...</h2>

          <li onClick={this.props.searchIMSLP}>
             - Classical music
          </li>

          <li onClick={this.props.searchMuseScore}>
            - Any music except classic
          </li>
        </ul>


      </div>
    );
  }
}

export default Intro;
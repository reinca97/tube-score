import React, { Component } from 'react';

class UserInfo extends Component {
  render() {
    return (
      <div className="user-info">

        <img
          src={this.props.userData.userPhotoUrl}
          alt="user photo from google-profile"
          className="user-photo"
        />

        <div className="user-email">
          {this.props.userData.userEmail}
          </div>

      </div>
    );
  }
}

export default UserInfo;
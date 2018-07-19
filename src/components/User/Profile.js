import React, { Component } from 'react';
import Login from './Login'
import UserInfo from './UserInfo'

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        {
          this.props.isLogin&&
          <div>Happy to see you, {this.props.userData.userName}! </div>
        }

        <Login
          isLogin={this.props.isLogin}
          onClickLogout={this.props.onClickLogout}
          onClickLogin={this.props.onClickLogin}
        />

        {
          this.props.isLogin&&
          <UserInfo
            userData={this.props.userData}
          />
        }

      </div>
    );
  }
}

export default Profile;
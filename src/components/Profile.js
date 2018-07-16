import React, { Component } from 'react';
import Login from './Login'
import UserInfo from './UserInfo'

class Profile extends Component {
  render() {
    return (
      <div>
        {
          this.props.isLogin&&
          <div>환영합니다, {this.props.userData.userName}님! </div>
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
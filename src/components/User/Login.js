import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div className="log-in-out">
        {this.props.isLogin&&
          <button onClick={this.props.onClickLogout} >
            Logout
          </button>
        }

        {!this.props.isLogin&&
        <button onClick={this.props.onClickLogin} >
          Login
        </button>
        }

      </div>
    );
  }
}

export default Login;
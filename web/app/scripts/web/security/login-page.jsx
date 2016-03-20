import React from 'react';

import AuthActions from '../../domain/security/oauth-actions';
import AuthStore from '../../domain/security/oauth-store';

export default class LoginPage extends React.Component {

  handleLogin(event) {
    console.debug('Google Auth - logging in...');
    event.preventDefault();
    AuthActions.login();
  }

  render () {
    return(
      <div id="page">
        <section id="main-content">
          <div id="login_form">
            <h2>Zaloguj się do serwisu używając konta:</h2>
            <ul>
              <li className="google">
                <a href="#" className="active" onTouchTap={this.handleLogin}>
                  <i className="fa fa-google"></i>
                  Log in with Google</a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  }

}

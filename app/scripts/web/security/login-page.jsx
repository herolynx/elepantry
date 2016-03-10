import React from 'react';

export default class LoginPage extends React.Component {

  render() {
    return (
      <div id="page">
        <section id="main-content">
          <div id="login_form">
            <h2>Zaloguj się do serwisu używając konta:</h2>
            <ul>
              <li className="google">
                <a href="view.html" className="active">
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

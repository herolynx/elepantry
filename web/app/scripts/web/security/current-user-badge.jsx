import React from 'react';

import CurrentUser from '../../domain/security/current-user-store';

let badge = React.createClass({

  getInitialState: function() {
    return {name: 'Elepantry', image: 'images/sample-men.jpg'};
  },

  componentDidMount: function() {
    console.debug('User badge - loading user info...');
    CurrentUser.load().then(userInfo => {
      console.debug('User badge - user info: ', userInfo);
      this.setState(userInfo);
    });
  },

  render: function() {
    return (
      <div className="row user">
        <div className="images">
          <img src={this.state.image} alt={this.state.name}/></div>
        <div className="name">
          {this.state.name}
        </div>
      </div>
    );
  }

});

export default badge;

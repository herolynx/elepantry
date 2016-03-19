import React from 'react';

import DViewActions from '../../domain/views/resource-view-actions';

let addResourceView = React.createClass({

  getInitialState: function() {
    return {name: ''};
  },

  onSaveClick: function(event) {
    event.preventDefault();
    console.debug('Adding view');
    DViewActions.createView({name: this.state.name});
    this.setState({name: ''});
  },

  handleChange: function(event) {
    this.setState({name: event.target.value});
  },

  render: function() {
    return (
      <div id="add-view-form">
        <div className="window">
          <a href="#" className="close-window">
            <i className="fa fa-times-circle"></i>
          </a>
          <ul>
            <li>
              <label>
                Name:
              </label>
              <fieldset>
                <input type="text" value={this.state.name} onChange={this.handleChange}></input>
              </fieldset>
            </li>
            <li>
              <button id="add-view-close" type="submit" onTouchTap={this.onSaveClick}>
                <i className="fa fa-hdd-o"></i>Save</button>
            </li>
          </ul>
        </div>
      </div>
    );
  }

});

export default addResourceView;

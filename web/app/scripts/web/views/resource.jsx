import React from 'react';

import RosourceMenuActions from './resource-menu-actions';

let resource = React.createClass({

  onClick: function(event) {
    event.preventDefault();
    console.debug('Resource selected: ', this.props.resource);
    RosourceMenuActions.resourceChosen(this.props.resource);
  },

  iconType: function(type) {
    //TODO implement this in view task
    return "fa fa-file-image-o";
  },

  render: function() {
    return (
      <div className="file" onTouchTap={this.onClick}>
        <a href="#" className="open_navigation_file"></a>
        <div className="icon">
          <span className="cloud google">
            <i className="fa fa-google"></i>
            <i className="info fa fa-info"></i>
          </span>
          <span className="file-type">
            <i className={this.iconType(this.props.resource.fileExtension)}></i>
          </span>
        </div>
        <div className="describe">
          <div>
            {this.props.resource.name}
          </div>
        </div>
      </div>
    );
  }

});

export default resource;

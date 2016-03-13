import React from 'react';

import GoogleDrive from '../../domain/storage/google-drive-store';
import File from './file';

let resourceView = React.createClass({

  getInitialState: function() {
    return {
      googleDrive: []
    };
  },

  componentDidMount: function() {
    console.debug('Resource view - loading list of files...');
    GoogleDrive.list().then(files => {
      console.debug('Google drive files received - size: ', files.length);
      this.setState({googleDrive: files});
    });
  },

  render: function() {
    return (
      <div id="files" className="list">
        {this.state.googleDrive.map(googleFile => {
          return <File googleFile={googleFile}/>;
        })}

      </div>
    );
  }

});

export default resourceView;

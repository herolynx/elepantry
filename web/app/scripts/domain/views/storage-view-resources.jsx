import Reflux from 'reflux';

import GoogleDrive from '../storage/google-drive-store';

let gDriveNextPageToken = undefined;
let gDriveHasNext = true;

let viewResources = Reflux.createStore({

  changeView: function(view) {
    console.debug('Changing storage view', view);
    gDriveNextPageToken = undefined;
    gDriveHasNext = true;
  },

  hasNext: function() {
    return gDriveHasNext;
  },

  /**
  * Load resources
  */
  next: function() {
    console.debug('Storage view resources - loading from Google Drive - next page token: ', gDriveNextPageToken);
    if(!this.hasNext()) {
      return;
    }
    GoogleDrive
      .list(gDriveNextPageToken)
      .then(([files, nextPageToken]) => {
        console.debug('Google drive resources loaded:', files.length, nextPageToken);
        gDriveNextPageToken = nextPageToken;
        gDriveHasNext = nextPageToken != undefined;
        this.trigger(files);
      });
  }

});

export default viewResources;

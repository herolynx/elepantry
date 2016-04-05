import Reflux from 'reflux';

import GoogleDrive from '../storage/google-drive-store';

let gDriveNextPageToken = undefined;
let gDriveHasNext = true;

let viewResources = Reflux.createStore({

  changeView: function(view) {
    console.debug('Changing storage view', view);
    this.clear();
  },

  hasNext: function() {
    return gDriveHasNext;
  },

  /**
  * Load resources
  *
  * @param searchText free text search
  */
  next: function(searchText) {
    console.debug('Storage view resources - loading from Google Drive - next page token: ', gDriveNextPageToken, searchText);
    if(!this.hasNext()) {
      return;
    }
    GoogleDrive
      .list(gDriveNextPageToken, searchText)
      .then(([files, nextPageToken]) => {
        console.debug('Google drive resources loaded:', files.length, nextPageToken);
        gDriveNextPageToken = nextPageToken;
        gDriveHasNext = nextPageToken != undefined;
        this.trigger(files);
      });
  },

  clear: function() {
    gDriveNextPageToken = undefined;
    gDriveHasNext = true;
  }

});

export default viewResources;

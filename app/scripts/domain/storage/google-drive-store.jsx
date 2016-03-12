import Reflux from 'reflux';

import Google from '../drivers/google-driver';

function toResource(item) {
  return {id: item.id, file: item, name: item.title, url: item.downloadUrl, type: item.fileExtension};
}

function retrieveAllFiles(resolve, reject) {
  let retrievePageOfFiles = (request, result) => {
    request.execute(resp => {
      result = result.concat(resp.items.map(item => toResource(item)));
      var nextPageToken = resp.nextPageToken;
      if (nextPageToken) {
        request = gapi.client.drive.files.list({'pageToken': nextPageToken});
        retrievePageOfFiles(request, result);
      } else {
        resolve(result);
      }
    });
  }
  let initialRequest = gapi.client.drive.files.list();
  retrievePageOfFiles(initialRequest, []);
}

let googleDrive = Reflux.createStore({

  list: function(pageToken) {
    console.debug('Listing all files from google drive...');
    return Google.loadClients().then((gapi) => {
      return new Promise((resolve, reject) => {
        retrieveAllFiles(resolve, reject);
      });

    });
  }

});

export default googleDrive;

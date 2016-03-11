import Reflux from 'reflux';

import Google from '../drivers/google-driver';

/**
 * Convert google file item into resource model
 * @return resource object
*/
function toResource(item) {
  return {
    id: item.id,
    name: item.title,
    previewUrl: item.webContentLink != undefined ? item.webContentLink.replace(/&export=download/, '') : undefined,
    downloadUrl: item.webContentLink,
    fileExtension: item.fileExtension,
    storage: 'google-drive'
  };
}

let googleDrive = Reflux.createStore({

  /**
  * List info about google files
  * @param pageToken optional page to be displayed (paging support)
  * @param fileNameQuery optional free text for file name searching
  * @param maxResults optional max results to be loaded
  * @return promise tuple of results and next page token
  */
  list: function(pageToken, fileNameQuery='', maxResults = 100) {
    console.debug('Listing all files from google drive - maxResults: ', maxResults);
    return Google.loadClients().then((gapi) => {
      return new Promise((resolve, reject) => {
        let query = `title contains '${fileNameQuery}'`;
        let request = gapi.client.drive.files.list({'pageToken': pageToken, 'maxResults': maxResults, q: query});
        request.execute(resp => {
          let result = resp.items.map(item => toResource(item));
          resolve([result, resp.nextPageToken]);
        });
      });
    });
  },

  /**
  * Download file
  * @param resource info about file
  * @return promise promise of downloaded file content
  */
  download: function(resource) {
    console.debug('Downloading from google drive: ', resource);
    return Google.loadClients().then((gapi) => {
      return new Promise((resolve, reject) => {
        let accessToken = gapi.auth.getToken().access_token;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', resource.downloadUrl);
        xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        xhr.onload = function() {
          resolve(xhr.responseText);
        };
        xhr.onerror = function(e) {
          reject(e);
        };
        xhr.send();
      });
    });
  }

});

export default googleDrive;

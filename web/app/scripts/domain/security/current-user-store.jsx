import Reflux from 'reflux';
import Google from '../drivers/google-driver';

let userStore = Reflux.createStore({
  listenables: [],

  /**
  * Load basic info about current user
  * @return promise of user info
  */
  load: function() {
    console.debug('Loading current user info');
    return Google.loadClients().then((gapi) => {
      console.debug('Loading current user info - API ready');
      return new Promise((resolve, reject) => {
        var request = gapi.client.plus.people.get({'userId': 'me'});
        request.execute(resp => {
          console.log('Current user:', resp.displayName, resp.image.url);
          resolve({name: resp.displayName, image: resp.image.url});
        });
      });
    });
  }

});

export default userStore;

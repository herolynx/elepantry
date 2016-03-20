import Reflux from 'reflux';

import Google from '../drivers/google-driver';
import UserRepo from '../repos/user';

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
          let currentUser = {
            id: resp.id,
            name: resp.displayName,
            email: resp.emails[0].value,
            image: resp.image.url,
          };
          console.log('Current user info loaded:', currentUser);
          resolve(currentUser);
        });
      });
    });
  }

});

export default userStore;

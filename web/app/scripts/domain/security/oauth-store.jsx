import Reflux from 'reflux';
import Cookie from 'react-cookie';

import OauthActions from './oauth-actions';
import Google from '../drivers/google-driver';

let sessionName = 'elepantryId';
let session = Cookie.load(sessionName);

let oauthStore = Reflux.createStore({
  listenables: [OauthActions],

  login: function() {
    console.debug('OAuth logging in...');
    Google.auth().then(authResult => {
      console.debug('OAuth result: ', authResult);
      session = undefined;
      if (authResult && !authResult.error) {
        session = authResult;
        Cookie.save(sessionName, session);
      }
      console.info('OAuth logged in: ', (session != null));
      OauthActions.loginCompleted(session != null);
    });
  },

  isLoggedIn: function() {
    return session != null;
  }

});

export default oauthStore;

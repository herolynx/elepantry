import CONF from '../../../conf/firebase.json';
import Firebase from 'firebase';

let ref = undefined;
let dbSession = undefined;

/**
* Connect to firebase
* @param resolve success callback
* @param reject fail callback
*/
function connect(resolve, reject) {
  if (ref !== undefined) {
    //return existing reference
    resolve(ref);
    return;
  }
  try {
    console.debug('Initializing DB');
    ref = new Firebase(CONF.url);
    ref.onAuth(function authDataCallback(authData) {
      if (authData) {
        console.log("DB - user is logged in, provider: ", authData.provider);
        dbSession = authData;
        resolve(ref);
      } else {
        console.log("DB - User is logged out");
        dbSession = undefined;
      }
    });
    ref.authWithOAuthPopup(CONF.oauth, function(error, authData) {
      if (error) {
        console.log("DB - Login Failed!", error.code, error);
        dbSession = undefined;
      } else {
        console.log("DB - Authenticated successfully with payload");
        dbSession = authData;
        resolve(ref);
      }
    });
  } catch (e) {
    console.error("Couldn't connect to DB", CONF.url, e);
    ref = undefined;
    reject("Couldn't connect to DB");
  }
}

/**
* Get DB reference
* @return promise of DB reference
*/
function db() {
  return new Promise((resolve, reject) => {
    connect(resolve, reject);
  });
}

let firebase = {

  isUp: function() {
    return ref != undefined && dbSession != undefined;
  },

  save: function(path, obj) {
    console.debug('Saving:', path, obj);
    db().then(ref => {
      console.debug('Saving to DB:', path, obj);
      ref.child(path).set(obj);
    });
  }

};

export default firebase;

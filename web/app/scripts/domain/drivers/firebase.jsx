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

  /**
  * Save data by inserting/updating with chosen ID
  * @param path document path
  * @return obj data to be saved
  */
  save: function(path, obj) {
    console.debug('Saving:', path, obj);
    db().then(ref => {
      console.debug('Saving to DB:', path, obj);
      ref.child(path).set(obj);
    });
  },

  /**
  * Create data and generate ID for new document
  * @param path document path
  * @return obj data to be saved
  */
  create: function(path, obj) {
    console.debug('Create:', path, obj);
    db().then(ref => {
      console.debug('Create in DB:', path, obj);
      ref.child(path).push().set(obj);
    });
  },

  /**
  * Remove data
  * @param path document path
  */
  remove: function(path) {
    console.debug('Removing:', path);
    db().then(ref => {
      console.debug('Removing from DB:', path);
      ref.child(path).remove();
    });
  },


  /**
  * Get data
  * @param path document path
  * @return promise with data
  */
  get: function(path) {
    console.debug('Getting:', path);
    return db().then(ref => {
      console.debug('Getting from DB:', path);
      return new Promise((resolve, reject) => {
        ref.child(path).on("value", function(snapshot) {
          resolve(snapshot.val());
        }, function(errorObject) {
          reject("The read failed: " + errorObject.code);
        });
      });
    });
  },

  /**
  * Convert object into array
  * @param obj DB representation of object
  * @return array with objects with IDs
  */
  toArray: function(obj) {
    let array = [];
    for (let id in obj) {
      let element = obj[id];
      element.id = id;
      array.push(element);
    }
    return array;
  }

};

export default firebase;

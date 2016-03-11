import CONF from '../../../conf/google.json';

/**
* Try to initialize GAPI. If not possible set timeout and re-try again.
* @param resolve where GAPI instance will be injected
* @param reject error notif function
* @param timeout re-try wait time
*/
function getGAPI(resolve, reject, timeout) {
  try {
    gapi.client.setApiKey(CONF.apiKey);
    gapi.auth.init();
    console.log('Google API loaded');
    resolve(gapi);
  } catch (e) {
    console.debug('Google API not loaded yet - waiting');
    setTimeout(
      () => getGAPI(resolve, reject, timeout),
      timeout
    );
  }
}

//promise of GAPI instance
let qGapi = new Promise((resolve, reject) => {
  getGAPI(resolve, reject, 50);
});

let driver = {

  /**
  * Load Google API
  * @return promise of a GAPI instance
  */
  loadAPI: function() {
    return qGapi;
  },

  /**
  * Authenticate current user using Google OAuth
  * @return promise of OAuth result
  */
  auth: function() {
    return this.loadAPI().
      then(gapi => {
        return new Promise((resolve, reject) => {
          gapi.auth.authorize(
            {
              client_id: CONF.clientId,
              scope: CONF.scope,
              immediate: false
            },
            (result) => resolve(result)
          );
        });

      });
  },

  /**
  * Load all drivers of all clients based on given Google API config
  * @return promise of an authorized GAPI instance
  */
  loadClients: function() {
    console.log('Loading Goole API clients: ', CONF.clients);
    return Promise.all(CONF.clients.map(client => {
      console.debug('Loading Google API client: ', client);
      return this.loadAPI().
        then(gapi => {
          return new Promise((resolve, reject) => {
            gapi.client.load(
              client.name,
              client.version,
              () => resolve(gapi)
            );
          });
        });
        }))
          .then(data => {
              //auth in order to refresh token if needed
              return new Promise((resolve, reject) => {
                data[0].auth.authorize(
                  {
                    client_id: CONF.clientId,
                    scope: CONF.scope,
                    immediate: true
                  },
                  (result) => {
                      if (result && !result.error) {
                        resolve(data[0]);
                      } else {
                        reject(result);
                      }
                    }
                );
            });
          });
  }

};

export default driver;

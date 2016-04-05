import db from '../drivers/firebase';
import CurrentUser from '../security/current-user-store';

const type = 'resources';

let currentUser = CurrentUser.load();

let resourceRepo = {

  /**
  * Update resource
  * @param resource data to be saved
  * @return promise with current user
  */
  save: function(resource) {
    console.debug('Saving resource', resource);
    return currentUser.then(user => {
      db.save(`${type}/${user.id}/${resource.id}`, resource);
    });
  },

  /**
  * Remove resource
  * @param resource data to be removed
  * @return promise with current user
  */
  remove: function(resource) {
    console.debug('Removing resource', resource);
    return currentUser.then(user => {
      db.remove(`${type}/${user.id}/${resource.id}`);
    });
  },

  /**
  * Get resource
  * @param id resourcce id
  * @return promise with data
  */
  find: function(id) {
    console.debug('Find resources', id);
    return currentUser.then(user => {
      return db.get(`${type}/${user.id}/${id}`).then(resource => {
        console.debug('Find resource', id, resource);
        return resource;
      });
    });
  },

  /**
  * Get resource
  * @param start start index
  * @param maxResults number of results
  * @return promise with data
  */
  get: function(start = undefined, maxResults = 100) {
    console.debug('Getting resources');
    return currentUser.then(user => {
      return db.page(`${type}/${user.id}`, start, maxResults, 'name').then(resourcesObj => {
        console.debug('Getting resources', resourcesObj);
        return db.toArray(resourcesObj);
      });
    });
  }
};

export default resourceRepo;

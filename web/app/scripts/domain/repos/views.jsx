import db from '../drivers/firebase';
import CurrentUser from '../security/current-user-store';

const type = 'views';

let currentUser = CurrentUser.load();

let viewsRepo = {

  /**
  * Update view
  * @param view data to be saved
  * @return promise with current user
  */
  save: function(view) {
    console.debug('Saving view', view);
    return currentUser.then(user => {
      db.save(`${type}/${user.id}/${view.id}`, view);
    });
  },

  /**
  * Save view
  * @param view data to be saved
  * @return promise with current user
  */
  create: function(view) {
    console.debug('Saving view', view);
    return currentUser.then(user => {
      db.create(`${type}/${user.id}`, view);
    });
  },

  /**
  * Remove view
  * @param view data to be removed
  * @return promise with current user
  */
  remove: function(view) {
    console.debug('Removing view', view);
    return currentUser.then(user => {
      db.remove(`${type}/${user.id}/${view.id}`);
    });
  },

  /**
  * Get view
  * @param id resourcce id
  * @return promise with data
  */
  find: function(id) {
    console.debug('Find view', id);
    return currentUser.then(user => {
      return db.get(`${type}/${user.id}/${id}`).then(view => {
        console.debug('Find view', id, view);
        return view;
      });
    });
  },

  /**
  * Get data
  * @return promise with data
  */
  get: function() {
    console.debug('Getting views');
    return currentUser.then(user => {
      return db.get(`${type}/${user.id}`).then(viewsObj => {
        console.debug('Getting views', viewsObj);
        return db.toArray(viewsObj);
      });
    });
  }

};

export default viewsRepo;

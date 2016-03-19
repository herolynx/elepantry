import db from '../drivers/firebase';
import CurrentUser from '../security/current-user-store';

const type = 'views';

let currentUser = CurrentUser.load();

let viewsRepo = {

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
  * Get data
  * @param path document path
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

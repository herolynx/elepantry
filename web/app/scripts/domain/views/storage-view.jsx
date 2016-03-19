import Reflux from 'reflux';

let storages = [
  {
    id: 'google-drive',
    name: 'Google Drive',
    type: 'google-drive',
    icon: 'fa-google',
    connected: true, //always connected since main account
    select: [],
    groupBy: []
  }
];

let storageView = Reflux.createStore({

  /**
  * Create view
  */
  createView: function(view) {
    console.debug('Adding view (not implemented)', view);
  },

  /**
  * Remove view
  */
  removeView: function(view) {
    console.debug('Removing view (not implemented)', view);
  },

  /**
  * Get views
  * @return promise of views
  */
  getViews: function() {
    console.debug('Getting storage views');
    return new Promise((resolve, reject) => {
      this.trigger(storages);
      resolve(storages);
    });
  }

});

export default storageView;

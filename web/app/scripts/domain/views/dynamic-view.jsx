import Reflux from 'reflux';
import _ from 'underscore';

import ViewActions from './resource-view-actions';
import ViewRepo from '../repos/views';

let storeViews = [];

let resourceView = Reflux.createStore({

  listenables: [ViewActions],

  /**
  * Create view
  */
  createView: function(view) {
    console.debug('Adding dynamic view', view);
    ViewRepo.create(view);
    this.getViews();
  },

  /**
  * Remove view
  */
  removeView: function(view) {
    console.debug('Removing dynamic view', view);
    ViewRepo.remove(view);
    storeViews = _.filter(storeViews, item => item.id != view.id);
    this.trigger(storeViews);
  },

  /**
  * Get views
  * @return promise of views
  */
  getViews: function() {
    console.debug('Getting dynamic views');
    return ViewRepo.get().then(views => {
      storeViews = views;
      this.trigger(storeViews);
      return views;
    });
  }

});

export default resourceView;

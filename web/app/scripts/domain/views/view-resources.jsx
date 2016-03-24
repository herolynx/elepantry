import Reflux from 'reflux';
import _ from 'underscore';

import SView from './storage-view-resources';
import DView from './dynamic-view-resources';

let currentView = SView;

let resourceView = Reflux.createStore({

  changeView: function(view) {
    console.debug('Changing view', view);
    if (view == undefined || view.static) {
      currentView = SView;
    } else {
      currentView = DView;
    }
    currentView.changeView(view);
  },

  current: function() {
    return currentView;
  }

});

export default resourceView;

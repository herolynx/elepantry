import Reflux from 'reflux';

let currentView = undefined;

let viewResources = Reflux.createStore({

  changeView: function(view) {
    console.debug('Changing dynamic view', view);
    currentView = view;
  },

  hasNext: function() {
    return false;
  },

  next: function() {
    console.debug('Dynamic view resources - loading from ', currentView);
    this.trigger([]);
  }
});

export default viewResources;

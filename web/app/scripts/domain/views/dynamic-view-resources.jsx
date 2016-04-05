import Reflux from 'reflux';
import _ from 'underscore';

import ResourceRepo from '../repos/resource';

let currentView = undefined;
let startIdx = undefined;
let maxResults = 100;
let hasNext = true;

let viewResources = Reflux.createStore({

  changeView: function(view) {
    console.debug('Changing dynamic view', view);
    currentView = view;
    this.clear();
  },

  hasNext: function() {
    return hasNext;
  },

  next: function(searchText) {
    if (!hasNext) {
      //nothing to do
      console.debug('Dynamic view resources - nothing to load', currentView, searchText, startIdx, maxResults);
      return;
    }
    console.debug('Dynamic view resources - loading from ', currentView, searchText, startIdx, maxResults);
    ResourceRepo.get(startIdx, maxResults).then(dbResources => {
      let resources = _.chain(dbResources || [])
          .filter(resource => currentView.select == undefined || currentView.select.length == 0 || _.intersection(currentView.select, resource.tags).length == currentView.select.length)
          .filter(resource => currentView.groupBy == undefined || currentView.groupBy.length == 0 || _.intersection(currentView.groupBy, resource.tags).length > 0)
          .filter(resource => resource.name.indexOf(searchText) != -1)
          .value();
      console.debug('Dynamic view resources - resources received ', currentView.name, resources.length);
      hasNext = resources != undefined && resources.length > 1;
      startIdx = hasNext
        ? resources[resources.length - 1].id
        : undefined;
      this.trigger(hasNext
        ? resources.slice(0, resources.length - 1)
        : resources);
    });
  },

  clear: function() {
    //empty
    startIdx = undefined;
    hasNext = true;
  }

});

export default viewResources;

import Reflux from 'reflux';
import _ from 'underscore';

import ResourceRepo from '../repos/resource';
import TagsActions from './tags-actions';

let resourceStore = {
  name: '',
  tags: []
};

let resourceView = Reflux.createStore({

  listenables: [TagsActions],

  /**
  * Create tag
  */
  createTag: function(tag) {
    if(resourceStore == undefined) {
      return;
    }
    let tags = tag != undefined
      ? tag.split(',').map(item => item.trim())
      : [];
    console.debug('Adding tag', tags);
    resourceStore.tags = _.union(resourceStore.tags || [], tags);
    ResourceRepo.save(resourceStore);
    this.trigger(resourceStore);
  },

  /**
  * Remove tag
  */
  removeTag: function(tag) {
    if(resourceStore == undefined) {
      return;
    }
    console.debug('Removing tag', tag);
    resourceStore.tags = _.filter(resourceStore.tags, rTag => rTag != tag);
    ResourceRepo.save(resourceStore);
    this.trigger(resourceStore);
  },

  /**
  * Get resource
  * @param resource
  * @return promise of resource
  */
  get: function(resource) {
    console.debug('Getting resource', resource);
    resourceStore = undefined;
    return ResourceRepo.find(resource.id).then(repoResource => {
      if(repoResource != null) {
        resourceStore = repoResource;
        resourceStore.id = resource.id;
      } else {
        resourceStore = resource;
      }
      this.trigger(resourceStore);
      return resourceStore;
    });
  },

  clear: function() {
    console.debug('Clearing resource store');
    resourceStore = undefined;
  }

});

export default resourceView;

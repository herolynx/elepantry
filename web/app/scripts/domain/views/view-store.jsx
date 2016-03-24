import Reflux from 'reflux';
import _ from 'underscore';

import ViewsRepo from '../repos/views';
import TagsActions from './tags-actions';

let viewStore = undefined;
let select = true;

let resourceView = Reflux.createStore({

  listenables: [TagsActions],

  /**
  * Create tag
  */
  createTag: function(tag) {
    if(viewStore == undefined) {
      return;
    }
    let tags = tag != undefined
      ? tag.split(',').map(item => item.trim())
      : [];
    console.debug('Adding view tag', tags);
    let viewTags = select ? viewStore.select : viewStore.groupBy;
    viewTags = _.union(viewTags || [], tags);
    viewStore[select ? 'select' : 'groupBy' ] = viewTags;
    ViewsRepo.save(viewStore);
    this.trigger(viewStore);
  },

  /**
  * Remove tag
  */
  removeTag: function(tag) {
    if(viewStore == undefined) {
      return;
    }
    console.debug('Removing view tag', tag);
    let viewTags = select ? viewStore.select : viewStore.groupBy;
    viewTags =  _.filter(viewTags, rTag => rTag != tag);
    viewStore[select ? 'select' : 'groupBy' ] = viewTags;
    ViewsRepo.save(viewStore);
    this.trigger(viewStore);
  },

  /**
  * Get view
  * @param view
  * @return promise of resource
  */
  get: function(view, selectTags) {
    console.debug('Getting view', view, selectTags);
    select = selectTags;
    viewStore = undefined;
    return ViewsRepo.find(view.id).then(repoView => {
      if(repoView != null) {
        viewStore = repoView;
        viewStore.id = view.id;
        this.trigger(viewStore);
      }
      return viewStore;
    });
  },

  clear: function() {
    console.debug('Clearing view store');
    viewStore = undefined;
  }

});

export default resourceView;

import React from 'react';
import Reflux from 'reflux';
import InfiniteScroll from 'react-infinite-scroller';

import ViewActions from './views-actions';
import Resource from './resource';
import View from '../../domain/views/view-resources';

/**
* Create view for given resource
* @param resource resource to be displayed
* @return JSX resource view
*/
function createResourceView(resource) {
  return (
    <Resource key={resource.id} resource={resource}/>
  );
}

let resourceView = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      resources: [],
      hasMore: true
    };
  },

  componentDidMount: function() {
    this.unsubscribeActions = ViewActions.showViewResources.listen(this.onViewChanged);
    this.currentViewUnsubscribe = View.current().listen(this.onResourceLoaded);
  },

  componentWillUnmount: function() {
    this.unsubscribeActions();
    this.currentViewUnsubscribe();
  },

  onViewChanged: function(view) {
    console.debug('View changed: ', view);
    this.currentViewUnsubscribe();
    this.setState(this.getInitialState());
    View.changeView(view);
    this.currentViewUnsubscribe = View.current().listen(this.onResourceLoaded);
    this.load();
  },

  load: function() {
    console.debug('Resource view - loading next page');
    View.current().next();
  },

  onResourceLoaded: function(resources) {
    console.debug('Resource view - next page loaded', resources.length);
    let newState = this.state;
    newState.resources.push(resources.map(file => createResourceView(file)));
    newState.hasMore = View.current().hasNext();
    this.setState(newState);
  },

  render: function() {
    return (
      <div id="files" className="list">
        <InfiniteScroll loader={<div className="loader">Loading ...</div>} loadMore={this.load} hasMore={this.state.hasMore} useWindow={false}>
          {this.state.resources}
        </InfiniteScroll>
      </div>
    );
  }

});

export default resourceView;

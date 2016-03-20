import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import GoogleDrive from '../../domain/storage/google-drive-store';

import Resource from './resource';

/**
* Create view for given resource
* @param resource resource to be displayed
* @return JSX resource view
*/
function createResourceView(resource) {
  return (
    <Resource key={resource.id} resource={resource} />
  );
}

let resourceView = React.createClass({

  getInitialState: function() {
    return {
      resources: [],
      nextPageToken: undefined,
      hasMore: true
    };
  },

  /**
  * Load resources
  */
  load: function() {
    console.debug('Resource view - loading - next page token: ', this.state.nextPageToken);
    GoogleDrive
      .list(this.state.nextPageToken)
      .then(([files, nextPageToken]) => {
        console.debug('Google drive resources loaded:', files.length, nextPageToken);
        let newState = this.state;
        newState.resources.push(files.map(file => createResourceView(file)));
        newState.nextPageToken = nextPageToken;
        newState.hasMore = nextPageToken !== undefined;
        this.setState(newState);
      });
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

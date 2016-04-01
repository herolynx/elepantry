import React from 'react';
import Reflux from 'reflux';
import _ from 'underscore';

import RosourceMenuActions from './resource-menu-actions';
import GoogleDrive from '../../domain/storage/google-drive-store';
import ResourceStore from '../../domain/views/resource-store';
import ViewTagsStore from '../../domain/views/view-store';

let resourceMenu = React.createClass({

  componentDidMount: function() {
    this.unsubscribeResourceActions = RosourceMenuActions.resourceChosen.listen(this.onResourceChosen);
    this.unsubscribeViewSelectActions = RosourceMenuActions.viewSelect.listen(this.onViewSelectChosen);
    this.unsubscribeViewGroupByActions = RosourceMenuActions.viewGroupBy.listen(this.onViewSelectGroupByChosen);
    this.unsubscribeStore = ResourceStore.listen(this.onResourceLoaded);
  },

  componentWillUnmount: function() {
    this.unsubscribeResourceActions();
    this.unsubscribeViewSelectActions();
    this.unsubscribeViewGroupByActions();
    this.unsubscribeStore();
  },

  getInitialState: function() {
    return {
      name: '',
      tags: [],
      allTags: [],
      view: false,
      select: true,
      filter: '',
      resource: undefined,
      loaded: false
    };
  },

  onViewLoaded: function(view) {
    console.debug('Resource menu - view loaded: ', view);
    if (view != undefined) {
      let tags = (this.state.select
        ? view.select
        : view.groupBy) || [];
      let newState = this.state;
      newState.allTags = tags;
      newState.tags = [];
      newState.loaded = true;
      this.setState(newState);
      this.filterTags();
    }
  },

  onViewSelectChosen: function(view) {
    console.debug('Resource menu - showing view select tags: ', view);
    this.unsubscribeStore();
    this.unsubscribeStore = ViewTagsStore.listen(this.onViewLoaded);
    this.setState({
      name: 'Select tags',
      tags: view.select || [],
      allTags: view.select || [],
      view: true,
      select: true,
      resource: undefined,
      loaded: false
    });
    ResourceStore.clear();
    ViewTagsStore.get(view, true);
  },

  onViewSelectGroupByChosen: function(view) {
    console.debug('Resource menu - showing view group by tags: ', view);
    this.unsubscribeStore();
    this.unsubscribeStore = ViewTagsStore.listen(this.onViewLoaded);
    this.setState({
      name: 'Group by tags',
      tags: view.groupBy || [],
      allTags: view.groupBy || [],
      view: true,
      select: false,
      resource: undefined,
      loaded: false
    });
    ResourceStore.clear();
    ViewTagsStore.get(view, false);
  },

  onResourceLoaded: function(resource) {
    console.debug('Resource menu - resource loaded: ', resource);
    if (resource != undefined) {
      let tags = resource.tags || [];
      let newState = this.state;
      newState.allTags = tags;
      newState.tags = [];
      newState.loaded = true;
      this.setState(newState);
      this.filterTags();
    }
  },

  onResourceChosen: function(resource) {
    console.debug('Resource menu - showing resource tags: ', resource);
    this.unsubscribeStore();
    this.unsubscribeStore = ResourceStore.listen(this.onResourceLoaded);
    this.setState({
      name: resource.name,
      tags: resource.tags || [],
      allTags: resource.tags || [],
      view: false,
      resource: resource,
      loaded: false
    });
    ViewTagsStore.clear();
    ResourceStore.get(resource);
  },

  onCloseClicked: function(event) {
    event.preventDefault();
    console.debug('Resource menu - hidding');
    this.setState(this.getInitialState());
  },

  onDownloadClicked: function(event) {
    event.preventDefault();
    console.debug('Download resource: ', this.state.resource);
    window.open(this.state.resource.downloadUrl);
  },

  onViewClicked: function(event) {
    event.preventDefault();
    console.debug('View resource: ', this.state.resource);
    window.open(this.state.resource.previewUrl);
  },

  onTagDeleteClicked: function(tag) {
    event.preventDefault();
    console.debug('Resource menu - remove tag: ', this.state.view, this.state.allTags, tag);
    if (this.state.view) {ViewTagsStore.removeTag(tag);} else {ResourceStore.removeTag(tag);}
  },

  onTagCreateClicked: function(event) {
    event.preventDefault();
    console.debug('Resource - add tag: ', this.state.resource);
  },

  tagView: function(tag) {
    let onDelete = () => this.onTagDeleteClicked(tag);
    return (
      <li key={tag}>
        <a href="#">{tag}</a>
        <a href="#" title="Delete" className="delete" onTouchTap={onDelete}>
          <i className="fa fa-trash-o"></i>
        </a>
      </li>
    )
  },

  filterTags: function() {
    console.debug('Filtering tags', this.state.allTags, this.state.filter);
    let newState = this.state;
    newState.tags = _.chain(this.state.allTags).filter(tag => tag.startsWith(newState.filter)).map(tag => this.tagView(tag)).value();
    this.setState(newState);
  },

  handleFilterChange: function(event) {
    let newState = this.state;
    newState.filter = event.target.value;
    this.setState(newState);
    this.filterTags();
  },

  render: function() {
    let resource = this.state.resource;
    console.debug('Resource menu - rendering', resource);
    let previewOption = resource != undefined && resource.previewUrl != undefined
      ? <li key={this.state.resource.previewUrl}>
          <a href="#" title="View" alt="View" onTouchTap={this.onViewClicked}>
            <i className="fa fa-eye"></i>
          </a>
        </li>
      : <li/>
    let downloadOption = resource != undefined && resource.downloadUrl != undefined
      ? <li key={this.state.resource.downloadUrl}>
          <a href="#" title="Download" alt="Download" onTouchTap={this.onDownloadClicked}>
            <i className="fa fa-cloud-download"></i>
          </a>
        </li>
      : <li/>
    return (
      <section id="navigation_right" className="view">
        <div className="header">
          <div className="row view">
            <h2>{this.state.name}</h2>
          </div>
          <div className="row add">
              <a href="#" className="add-tag" onTouchTap={this.onTagCreateClicked}>
                <i className="fa fa-plus"></i>Add tags</a>
            </div>
          <div className="row search">
            <div>
              <input placeholder="Search..." value={this.state.filter} onChange={this.handleFilterChange}/>
            </div>
          </div>
        </div>
        <div id="wrapper">
          <div className="tags">
            <ul>
              {this.state.tags}
            </ul>
          </div>
        </div>
        <div className="action">
          <ul>
            {previewOption}
            {downloadOption}
            <li key="close">
              <a href="#" title="Close" alt="Close" className="close_navigation_view" onTouchTap={this.onCloseClicked}>
                <i className="fa fa-times"></i>
              </a>
            </li>
          </ul>
        </div>
      </section>
    );
  }

});

export default resourceMenu;

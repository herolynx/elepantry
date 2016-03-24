import React from 'react';
import Reflux from 'reflux';

import CurrentUserBadge from '../security/current-user-badge';
import SView from '../../domain/views/storage-view';
import DView from '../../domain/views/dynamic-view';
import DViewActions from '../../domain/views/resource-view-actions';
import ViewActions from './views-actions';

let viewsMenu = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      sViews: [],
      dViews: []
    };
  },

  componentDidMount: function() {
    this.sviewUnsubscribe = SView.listen(this.onSViews);
    SView.getViews();
    this.dviewUnsubscribe = DView.listen(this.onDViews);
    DView.getViews();
  },

  componentWillUnmount: function() {
    this.sviewUnsubscribe();
    this.dviewUnsubscribe();
  },

  onDViews: function(dViews) {
    console.log('onDViews', dViews);
    let viewItems = dViews.map(view => {
      return this.viewItem(view);
    });
    let state = this.state;
    state.dViews = viewItems;
    this.setState(state);
  },

  onDeleteViewClick: function(view) {
    console.debug('Deleting view: ', view);
    DViewActions.removeView(view);
  },

  viewItem: function(view) {
    let onDelete = () => this.onDeleteViewClick(view);
    let onViewChange = () => this.onChangeViewClicked(view);
    return (
      <li key={view.id}>
        <a href="#" className="open_navigation_view" onTouchTap={onViewChange}>{view.name}</a>
        <a href="#" title="Delete" className="delete" onTouchTap={onDelete}>
          <i className="fa fa-trash-o"></i>
        </a>
      </li>
    );
  },

  onSViews: function(sViews) {
    console.log('onSViews', sViews);
    let storageItems = sViews.map(storage => {
      return this.storageItem(storage);
    });
    let state = this.state;
    state.sViews = storageItems;
    this.setState(state);
  },

  storageItem: function(storage) {
    let status = storage.connected
      ? <i className="small fa fa-check-circle-o"></i>
      : <i class="small fa fa-times-circle-o"></i>;
    let onViewChange = () => this.onChangeViewClicked(storage);
    return (
      <li className="active" key={storage.id}>
        <a href="#" onTouchTap={onViewChange}>
          <i className={`fa ${storage.icon}`}></i>
          {storage.name}
          {status}
        </a>
      </li>
    );
  },

  onChangeViewClicked: function(view) {
    console.debug('Changing view', view);
    ViewActions.showViewResources(view);
  },

  render: function() {
    return (
      <section id="navigation">
        <button className="hamburger hamburger--htx">
          <span>toggle menu</span>
        </button>
        <CurrentUserBadge/>
        <div className="row add">
          <a href="#" className="add-view">
            <i className="fa fa-plus"></i>Add view</a>
        </div>
        <div id="wrapper">
          <nav>
            <ul>
              {this.state.sViews}
            </ul>
            <ul>
              {this.state.dViews}
            </ul>
          </nav>
        </div>
      </section>
    );
  }

});

export default viewsMenu;

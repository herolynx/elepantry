import React from 'react';
import Reflux from 'reflux';

import CurrentUserBadge from '../security/current-user-badge';
import SView from '../../domain/views/storage-view';
import DView from '../../domain/views/resource-view';
import DViewActions from '../../domain/views/resource-view-actions';

let viewsMenu = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      sViews: [],
      dViews: []
    };
  },

  componentDidMount: function() {
    // DView.createView({name: 'SiFi books', select: ['si-fi', 'social', 'book'], orderBy: ['mobi', 'pdf']});
    // DView.createView({name: 'Fantasy', select: ['fantasy'], orderBy: ['tolkien', 'sapkowski']});
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
    return (
      <li key={view.id}>
        <a href="#" className="open_navigation_view">{view.name}</a>
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
    return (
      <li className="active" key={storage.id}>
        <a href="#">
          <i className={`fa ${storage.icon}`}></i>
          {storage.name}
          {status}
        </a>
      </li>
    );
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

import React from 'react';
import Reflux from 'reflux';

import MenuActions from '../views/resource-menu-actions';
import ViewActions from '../views/views-actions';

let pageMenu = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      view: {
        id: 'google-drive',
        name : 'Google Drive',
        static : true
      },
      searchText: ''
    };
  },

  componentDidMount: function() {
    this.viewActionsUnsubscribe = ViewActions.showViewResources.listen(this.onViewChanged);
  },

  componentWillUnmount: function() {
    this.viewActionsUnsubscribe();
  },

  onViewChanged: function(view) {
    console.debug('View changed: ', view);
    if (view.static == undefined) {
      //
      view.static = false;
    }
    let newState = this.state;
    newState.view = view;
    this.setState(newState);
  },

  tagsOption: function(view, select) {
    // console.debug('Creating select tags option for view', view, select);
    let show = () => {
      if(select) {
        //
        MenuActions.viewSelect(view);
      } else {
        //
        MenuActions.viewGroupBy(view);
      }
      showTagsMenu();
    };
    let name = select
      ? 'Select'
      : 'Group by';
    let selectOption = (view.static != undefined && view.static)
      ? <div/>
      : <li key={name}>
        <a href="#" onTouchTap={show}>{name}</a>
      </li>;
    return (selectOption);
  },

  handleSearchChange: function(event) {
    let newState = this.state;
    if(newState.searchAction != undefined) {
      //clear previously scheduled search event
      clearTimeout(newState.searchAction);
    }
    newState.searchText = event.target.value;
    console.debug('Search text changed', newState.searchText);
    //make delay to not overflow with search events
    newState.searchAction = setTimeout(() => ViewActions.searchTextChange(newState.searchText), 500);
    this.setState(newState);
  },

  render: function() {
    let selectOption = this.tagsOption(this.state.view, true);
    let groupByOption = this.tagsOption(this.state.view, false);
    return (
      <div id="top-bar">
        <div className="content">
          <div className="search">
            <div>
              <input placeholder="Search..." value={this.state.searchText} onChange={this.handleSearchChange}/>
            </div>
            <div>
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div className="tags">
            <ul>
              <li key={this.state.view.name}>
                <a href="#">{this.state.view.name}</a>
              </li>
              {selectOption}
              {groupByOption}
            </ul>
          </div>
        </div>
      </div>
    );
  }

});

export default pageMenu;

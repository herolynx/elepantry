import React from 'react';
import Reflux from 'reflux';

import MenuActions from '../views/resource-menu-actions';
import ViewActions from '../views/views-actions';

let pageMenu = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {id: 'google-drive', name: 'Google Drive', static: true};
  },

  componentDidMount: function() {
    this.viewActionsUnsubscribe = ViewActions.showViewResources.listen(this.onViewChanged);
  },

  componentWillUnmount: function() {
    this.viewActionsUnsubscribe();
  },

  onViewChanged: function(view) {
    console.debug('View changed: ', view);
    this.setState({static:false});
    this.setState(view);
  },

  tagsOption: function(view, select) {
    console.debug('Creating select tags option for view', view, select);
    let show = () => {
      if(select) {
        MenuActions.viewSelect(this.state);
      }
      else {
        MenuActions.viewGroupBy(this.state);
      }
      showTagsMenu();
    };
    let name = select ? 'Select' : 'Group by';
    let selectOption = (view.static != undefined && view.static)
      ? <div/>
      : <li key={name}>
        <a href="#" onTouchTap={show}>{name}</a>
      </li>;
    return (selectOption);
  },

  render: function() {
    let selectOption = this.tagsOption(this.state, true);
    let groupByOption = this.tagsOption(this.state, false);
    return (
      <div id="top-bar">
        <div className="content">
          <div className="search">
            <div>
              <input placeholder="Search..."/>
            </div>
            <div>
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div className="tags">
            <ul>
              <li key={this.state.name}>
                <a href="#">{this.state.name}</a>
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

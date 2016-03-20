import React from 'react';
import Reflux from 'reflux';

import RosourceMenuActions from './resource-menu-actions';
import GoogleDrive from '../../domain/storage/google-drive-store';

let resourceMenu = React.createClass({

  componentDidMount: function() {
    this.unsubscribe = RosourceMenuActions.resourceChosen.listen(this.onResourceChosen);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  getInitialState: function() {
    return {resource: {name: ''}};
  },

  onResourceChosen: function(resource) {
    console.debug('Resource menu - showing: ', resource);
    let newState = this.state;
    newState.resource = resource;
    newState.show = true;
    this.setState(newState);
  },

  onCloseClicked: function(event) {
    event.preventDefault();
    console.debug('Resource menu - hidding');
    let newState = this.state;
    newState.show = false;
    this.setState(newState);
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

  render: function() {
    return (
      <section id="navigation_right" className="view">
        <div className="header">
          <div className="row view">
            <h2>{this.state.resource.name}</h2>
          </div>
          <div className="row add">
            <a href="#" className="add-tag">
              <i className="fa fa-plus"></i>Add tags</a>
          </div>
          <div className="row search">
            <div>
              <input placeholder="Search..."/>
            </div>
            <div>
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div id="wrapper">
          <div className="tags">
            <ul>
              <li>
                <a href="#">Filmy</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Muzyka</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Książki</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Dokumenty</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Zdjęcia</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Wspolne</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Marcinek</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Wakacje 2014</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Ważne</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Stare</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Rodzice</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Wycieczki</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Filmy</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Muzyka</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Książki</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Dokumenty</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Zdjęcia</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Wspolne</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Marcinek</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Wakacje 2014</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Ważne</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Stare</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Rodzice</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
              <li>
                <a href="#">Wycieczki</a>
                <a href="#" title="Delete" className="delete">
                  <i className="fa fa-trash-o"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="action">
          <ul>
            <li>
              <a href="#" title="View" alt="View" onTouchTap={this.onViewClicked}>
                <i className="fa fa-eye"></i>
              </a>
            </li>
            <li>
              <a href="#" title="Download" alt="Download" onTouchTap={this.onDownloadClicked}>
                <i className="fa fa-cloud-download"></i>
              </a>
            </li>
            <li>
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

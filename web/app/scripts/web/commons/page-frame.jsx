import React from 'react';

import StorageFilter from './storage-filter';
import PageMenu from './page-menu';
import ViewsMenu from '../views/views-menu';
import ResourceMenu from '../views/resource-menu';

export default class PageFrame extends React.Component {

  render() {
    return (
      <div id="page">
        <ViewsMenu/>
        <ResourceMenu/>
        <section id="main-content">
          <PageMenu/>
          <div className="content">
            <StorageFilter/>
            {this.props.children}
          </div>
        </section>
      </div>
    );
  }

}

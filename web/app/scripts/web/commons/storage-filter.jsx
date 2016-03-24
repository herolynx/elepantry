import React from 'react';

export default class StorageFilter extends React.Component {

  render() {
    return (
      <div className="row sort_view">
        <div id="sort_by_file">
          <span>Show:</span>
          <ul>
            <li>
              <a href="#" className="active">
                <i className="fa fa-google"></i>
              </a>
            </li>
          </ul>
        </div>
        <div id="view_file">
          <span>View type:</span>
          <ul>
            <li>
              <a href="#" id="view_list" className="active">
                <i className="fa fa-list"></i>
              </a>
            </li>
            <li>
              <a href="#" id="view_grid">
                <i className="fa fa-th"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

}

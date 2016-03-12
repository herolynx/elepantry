import React from 'react';

export default class StorageFilter extends React.Component {

  render() {
    return (
      <div className="row sort_view">
        <div id="sort_by_file">
          <span>Pokaż:</span>
          <ul>
            <li>
              <a href="#" className="active">
                <i className="fa fa-google"></i>
              </a>
            </li>
            <li>
              <a href="#" className="active">
                <i className="fa fa-dropbox"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-cloud"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-amazon"></i>
              </a>
            </li>
          </ul>
        </div>
        <div id="view_file">
          <span>Widok</span>
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
        <div id="sort_by_select">
          <div className="select">
            <select>
              <option value="1">Sortuj po</option>
              <option value="2">Nazwie pliku</option>
              <option value="3" disabled>Dacie dodania</option>
              <option value="4">Wielkości pliku</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

}

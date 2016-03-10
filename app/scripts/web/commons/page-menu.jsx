import React from 'react';

export default class PageMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return(
      <div id="top-bar">
        <div className="content">
          <div className="search">
            <div>
              <input placeholder="Szukaj"/>
            </div>
            <div>
              <select>
                <option value="1">Tagi</option>
                <option value="2">Pliki</option>
              </select>
            </div>
            <div>
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div className="tags">
            <ul>
              <li>
                <a href="#">Selected</a>
              </li>
              <li>
                <a href="#">Group by</a>
              </li>
              <li>
                <a href="all_tags.html">All tags</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

}

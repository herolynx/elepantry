import React from 'react';

export default class ResourceMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return(
      <section id="navigation_right" className="view">
        <div className="header">
          <div className="row view">
            <h2>Zdjęcia z wakacji</h2>
          </div>
          <div className="row add">
            <a href="#" className="add-tag">
              <i className="fa fa-plus"></i>Dodaj tagi</a>
          </div>
          <div className="row search">
            <div>
              <input placeholder="Szukaj w tagach"/>
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
              <a href="#" title="Close" alt="Close" className="close_navigation_view">
                <i className="fa fa-times"></i>
              </a>
            </li>
            <li>
              <a href="#" title="Edit" alt="Edit">
                <i className="fa fa-pencil"></i>
              </a>
            </li>
            <li>
              <a href="#" title="Delete" alt="Delete">
                <i className="fa fa-trash-o"></i>
              </a>
            </li>
          </ul>
        </div>
      </section>
    );
  }

}

import React from 'react';

export default class ViewsMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return(
      <section id="navigation">
        <button className="hamburger hamburger--htx">
          <span>toggle menu</span>
        </button>
        <div className="row user">
          <div className="images">
            <img src="images/sample-men.jpg" alt="Mateusz Kowalski"/></div>
          <div className="name">
            Mateusz<br/>
            Kowalski
          </div>
          <div className="settings">
            <a href="#">
              <i className="fa fa-cog"></i>
            </a>
          </div>
        </div>
        <div className="row add">
          <a href="#" className="add-view">
            <i className="fa fa-plus"></i>Dodaj widok</a>
        </div>
        <div id="wrapper">
          <nav>
            <ul>
              <li className="active">
                <a href="#">
                  <i className="fa fa-google"></i>
                  Google Drive
                  <i className="small fa fa-check-circle-o"></i>
                </a>
              </li>
              <li >
                <a href="#">
                  <i className="fa fa-dropbox"></i>DropBox
                  <i className="small fa fa-check-circle-o"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-cloud"></i>One Drive
                  <i className="small fa fa-times-circle-o"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-amazon"></i>Amazon Drive
                  <i className="small fa fa-times-circle-o"></i>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">
                  <b>Nieotagowane</b>
                </a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Filmy</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Muzyka</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Książki</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Dokumenty</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Zdjęcia</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Wspolne</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Marcinek</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Wakacje 2014</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Ważne</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Stare</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Rodzice</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Wycieczki</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Marcinek</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Wakacje 2014</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Ważne</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Stare</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Rodzice</a>
              </li>
              <li>
                <a href="#" className="open_navigation_view">Wycieczki</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    );
  }

}

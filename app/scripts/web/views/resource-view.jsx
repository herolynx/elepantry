import React from 'react';

export default class ResourceView extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return(
      <div id="files" className="list">
        <div className="file">
          <a href="#" className="open_navigation_file"></a>
          <div className="icon">
            <span className="cloud dropbox">
              <i className="fa fa-dropbox"></i>
              <i className="info fa fa-info"></i>
            </span>
            <span className="file-type">
              <i className="fa fa-file-word-o"></i>
            </span>
          </div>
          <div className="describe">
            <div>
              Władca Pierścieni: Dwie wieże
            </div>
          </div>
        </div>
        <div className="file">
          <a href="#" className="open_navigation_file"></a>
          <div className="icon">
            <span className="cloud google">
              <i className="fa fa-google"></i>
              <i className="info fa fa-info"></i>
            </span>
            <span className="file-type">
              <i className="fa fa-file-pdf-o"></i>
            </span>
          </div>
          <div className="describe">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis imperdiet mauris.
              <span>(rozmiar: 20 mb)</span>
            </div>
          </div>
        </div>
        <div className="file">
          <a href="#" className="open_navigation_file"></a>
          <div className="icon">
            <span className="cloud dropbox">
              <i className="fa fa-dropbox"></i>
              <i className="info fa fa-info"></i>
            </span>
            <span className="file-type">
              <i className="fa fa-file-word-o"></i>
            </span>
          </div>
          <div className="describe">
            <div>
              Władca Pierścieni: Dwie wieże
              <span>(rozmiar: 123 kb)</span>
            </div>
          </div>
        </div>
        <div className="file">
          <a href="#" className="open_navigation_file"></a>
          <div className="icon">
            <span className="cloud google">
              <i className="fa fa-google"></i>
              <i className="info fa fa-info"></i>
            </span>
            <span className="file-type">
              <i className="fa fa-file-word-o"></i>
            </span>
          </div>
          <div className="describe">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis imperdiet mauris.
              <span>(rozmiar: 10 mb)</span>
            </div>
          </div>
        </div>
        <div className="file">
          <a href="#" className="open_navigation_file"></a>
          <div className="icon">
            <span className="cloud dropbox">
              <i className="fa fa-dropbox"></i>
              <i className="info fa fa-info"></i>
            </span>
            <span className="file-type">
              <i className="fa fa-file-word-o"></i>
            </span>
          </div>
          <div className="describe">
            <div>
              Władca Pierścieni: Dwie wieże
            </div>
          </div>
        </div>
        <div className="file">
          <a href="#" className="open_navigation_file"></a>
          <div className="icon">
            <span className="cloud google">
              <i className="fa fa-google"></i>
              <i className="info fa fa-info"></i>
            </span>
            <span className="file-type">
              <i className="fa fa-file-word-o"></i>
            </span>
          </div>
          <div className="describe">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis imperdiet mauris.
            </div>
          </div>
        </div>
      </div>
    );
  }

}

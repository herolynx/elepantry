import React from 'react';

export default class File extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return(
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
            {this.props.googleFile.name}
          </div>
        </div>
      </div>
    );
  }

}

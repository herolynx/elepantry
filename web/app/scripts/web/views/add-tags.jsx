import React from 'react';

import TagActions from '../../domain/views/tags-actions';

let addResourceTags = React.createClass({

  getInitialState: function() {
    return {tags: ''};
  },

  onSaveClick: function(event) {
    event.preventDefault();
    console.debug('Adding tags', this.state.tags);
    TagActions.createTag(this.state.tags);
    this.setState({tags: ''});
  },

  handleChange: function(event) {
    this.setState({tags: event.target.value});
  },

  render: function() {
    return (
      <div id="add-tag-form">
      	<div className="window">
      		<a href="#" className="close-window"><i className="fa fa-times-circle"></i></a>
      		<ul>
      			<li>
      				<label>
      					Tags:
      				</label>
      				<fieldset>
      					<input id="add-tag-input" value={this.state.tags} onChange={this.handleChange} />
      				</fieldset>
      			</li>
      			<li>
      				<button id="add-tag-close" type="submit" onTouchTap={this.onSaveClick}><i className="fa fa-hdd-o"></i> Save</button>
      			</li>
      		</ul>
      	</div>
      </div>
    );
  }

});

export default addResourceTags;

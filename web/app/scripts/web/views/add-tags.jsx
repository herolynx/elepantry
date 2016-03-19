import React from 'react';

let addResourceTags = React.createClass({

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
      					<textarea></textarea>
      				</fieldset>
      			</li>
      			<li>
      				<button type="submit"><i className="fa fa-hdd-o"></i> Save</button>
      			</li>
      		</ul>
      	</div>
      </div>
    );
  }

});

export default addResourceTags;

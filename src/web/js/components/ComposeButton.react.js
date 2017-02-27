'use strict';

var React = require('react');
var InboxActions = require('../actions/InboxActions');
var ComposeArea = require('./ComposeArea.react');

/**
 * The compose button opens the compose UI to write a new (non-reply) email.
 */
var ComposeButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func
  },

  setOnClick: function() {
    InboxActions.setInReplyTo({
      replyAll: false,
      message: {}
    });
    InboxActions.setComposeUIOpen({
      message: {}
    });
  },

  render: function() {
    return (
      <button type="button"
              id="compose-button"
              className="btn btn-primary inbox-button"
              onClick={this.setOnClick}>
        Compose Message
      </button>
    );
  }
});

module.exports = ComposeButton;

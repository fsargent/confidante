'use strict';

var React = require('react');
var Message = require('./Message.react');
var messageParsing = require('../messageParsing');

/**
 * A Thread is 1 or more messages, displayed in full. It's what you see in
 * the app when you click on a thread snippet.
 */
var Thread = React.createClass({
  getInitialState: function() {
    return {
      messages: [],
      checked: false,
    }
  },
  close: function() {
    this.props.closeCallback();
  },
  render: function() {
    var messages = this.props.thread.messages.map(function(message) {
      return <li key={message.id}> <Message message={message} /> </li>
    });
    var subject = messageParsing.getThreadHeader(this.props.thread, 'Subject');
    return (
      <div className="row thread">
        <div className="threadHeader">
          <h4 className="subjectLine">{subject}</h4>
          <button type="button" className="close threadClose" onClick={this.close}>&times;</button>
        </div>
        <ul>{messages}</ul>
      </div>
    );
  }
})

module.exports = Thread;
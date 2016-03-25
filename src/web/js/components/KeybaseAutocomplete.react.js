'use strict';

var React = require('react');
var AutocompleteStore = require('../stores/AutocompleteStore');
var InboxActions = require('../actions/InboxActions');
var KeybaseAPI = require('../keybaseAPI');
var KeybaseCard = require('./KeybaseCard.react');
var Typeahead = require('@tappleby/react-typeahead-component');

var KeybaseAutocomplete = React.createClass({
  getInitialState: function() {
    return {
      completions: AutocompleteStore.getKeybase(),
      kbto: '',     // Current Keybase username being typed
      selected: []  // Array of selected Keybase usernames
    };
  },

  componentDidMount: function() {
    AutocompleteStore.addKeybaseListener(this.handleNewCompletions);
  },

  componentWillReceiveProps: function(props) {
    this.setState({ selected: props.kbto });
  },

  // When the user navigates away from the input box, make it into a token.
  handleFocusLost(event) {
    let kbto = event.target.value;
    this.addUsernameAndUpdate(kbto);
  },

  // Get the latest values from the AutocompleteStore and store it in state.
  handleNewCompletions: function() {
    this.setState({ completions: AutocompleteStore.getKeybase() });
  },

  // When a user selects an autocomplete result, add the username to selected.
  handleResultSelected: function(event, keybase) {
    this.addUsernameAndUpdate(keybase.username);
  },

  // When the user scrolls through autocompletions, change the input value to
  // the highlighted username.
  handleResultScroll: function(event, keybase, index) {
    if (index == -1) {
      return;
    }
    this.setState({ kbto: keybase.username });
  },

  // When the user types something, make it a token if it ends in a comma.
  // Otherwise keep the input value updated.
  handleValueChanged: function(event) {
    let kbto = event.target.value;
    if (kbto.endsWith(',')) {
      this.addUsernameAndUpdate(kbto.slice(0, kbto.length - 1));
    } else {
      this.setState({ kbto: kbto });
    }
    InboxActions.getKeybase(kbto);
  },

  addUsernameAndUpdate: function(username) {
    let updated = this.state.selected.slice();
    updated.push(username);
    this.setState({ selected: updated, kbto: '' });
    this.props.updateParent(updated);
  },

  deleteUsername: function(username) {
    let idx = this.state.selected.indexOf(username);
    if (idx == -1) {
      return;
    }
    let updated = this.state.selected.slice();
    updated.slice(idx, 1);
    this.setState({ selected: updated });
    this.props.updateParent(updated);
  },

  render: function() {
    let selected = this.state.selected.map(function(username) {
      return (
        <li className="contact-token" key={username}>
          {username}
          <button type="button"
                  className="close delete-contact"
                  onClick={this.deleteUsername.bind(this, username)}>
            &times;
          </button>
        </li>
      );
    }.bind(this));

    return (
      <ul className="autocomplete-input">
        {selected}
        <Typeahead inputValue={this.state.kbto}
                   onBlur={this.handleFocusLost}
                   onChange={this.handleValueChanged}
                   onOptionChange={this.handleResultScroll}
                   onOptionClick={this.handleResultSelected}
                   options={this.state.completions}
                   optionTemplate={KeybaseCard} />
      </ul>
    );
  }
});

module.exports = KeybaseAutocomplete;

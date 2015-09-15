var React = require('react');

//material-ui
var mui = require('material-ui');

//Stores
var DataStore = require('./../stores/DataStore');
var BulbStore = require('./../stores/BulbStore');

//Dispatcher
var Dispatcher = require('./../dispatcher/Dispatcher');

//Child Views
var BulbView = require('./bulbView.jsx');

//Actions
var ViewActions = require('./../actions/ViewActions');
var ActionTypes = require('./../constants/Constants').ActionTypes;

var Instructions = React.createClass({ 
  render: function(){ 
    return (
      <div>
      Hello.
      </div>

      )

  }
});

module.exports = Instructions;

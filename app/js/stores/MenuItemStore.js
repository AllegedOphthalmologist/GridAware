var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;

//routes
var instruction = require('../components/instructionView.jsx');

var CHANGE_EVENT = 'change';

var menuItems = [
  { route: 'home', text: 'Home', display: true },
  { route: instruction, text: 'Get Started', display: true },
];

var MenuStore = assign({}, EventEmitter.prototype, {
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }, 

  getActiveItems: function(){
    var display = [];
    menuItems.forEach(function(item){
      if(item.display){
        display.push(item);
      }
    });
    return display;
  }
});

module.exports = MenuStore;

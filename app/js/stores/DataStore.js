var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;

var moment = require('moment');

var CHANGE_EVENT = 'change';

var data = {'Watt': [{}]};

var DataStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  setData: function(newData, key){
    data[key] = newData;
  },
  getData: function(key){
    if (key) {
      return data[key];
    }
    else {
      return data;
    }
  }
});
DataStore.dispatchToken = Dispatcher.register(function (dispatch) {
  
  var action = dispatch.action;
  if (action.type === ActionTypes.WATT_LOADED) {
    DataStore.setData(action.payload, 'Watt');
    DataStore.emitChange();
  } 
});

module.exports = DataStore;

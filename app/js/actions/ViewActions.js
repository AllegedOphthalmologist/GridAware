var Dispatcher = require('../dispatcher/Dispatcher');
var ModalDispatcher = require('../dispatcher/ModalDispatcher');

var ActionTypes = require('../constants/Constants').ActionTypes;
var util = require('../utils/utils.js');

var ViewActions = {
  loadWatt: function () {
    // TODO: Make an api_utils library to get actual data from our API
    // Using Placeholder data for now
    var data = {
      energy_state: "dirty",
      at_peak: true
    };
    return util.getWattTotal()
    .then(function(data) {
      Dispatcher.handleViewAction({
        type: ActionTypes.WATT_LOADED,
        payload: data
      });
    })
    .catch(function(err) {
      throw err;
    });

  },

  getBulbColor: function(){ 
    return util.getHexCode()
      .then(function(code){ 
        Dispatcher.handleViewAction({ 
          type: ActionTypes.SET_BULB_COLOR, 
          payload: code
        });
      })
      .catch(function(err){ 
        throw err;
      });
  },

  toggleNavMenu: function() {
    Dispatcher.handleViewAction({
      type: ActionTypes.TOGGLE_NAV_MENU,
      payload: null
    });
  },

  loadModal: function(modal){
    ModalDispatcher.handleViewAction({
      type: ActionTypes.LOAD_MODAL,
      payload: modal
    });
  },

  showSnack: function(){
    Dispatcher.handleViewAction({
      type: ActionTypes.SHOW_SNACK,
      payload: null
    });
  },
};

module.exports = ViewActions;

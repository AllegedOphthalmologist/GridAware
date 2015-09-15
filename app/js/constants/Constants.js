var keyMirror = require('../../../node_modules/react/lib/keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    WATT_LOADED: null,
    UTILITY_LOADED: null,
    TOGGLE_NAV_MENU: null,
    LOAD_MODAL: null,
    SET_BULB_COLOR: null,
  }),

  ActionSources: keyMirror({
    VIEW_ACTION: null
  }), 

  ServerRoutes: {
    WATT_BEHIND: '/api/get24HourBehind',
    WATT_AHEAD: '/api/get24HourAhead',
    BULB_COLOR: '/api/bulbcolor',
  },

  GraphTypes: keyMirror({
    MAIN: null,
  }),

  Weekdays: {
    0: "Sun",
    1: "Mon",
    2: "Tues",
    3: "Wed",
    4: "Thurs",
    5: "Fri",
    6: "Sat",
  },

  Months : {
    0: "January",
    1: "Febuary",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  }
};
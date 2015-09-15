var routes = require('../constants/Constants.js').ServerRoutes;

// Helper functions

var GetReq = function(route){
  // console.log("Sending GET to " + route);
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: route,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        // console.log('succuss in ajax');
        resolve(data);
      },
      error: function(xhr, status, err) {
        // console.log('error in ajax', status, err, xhr)
        reject(err);
      }
    });
  });
};

module.exports = {
  getWattTotal : function() {
    return GetReq(routes.WATT_BEHIND)
    .then(function(behind) {
      return GetReq(routes.WATT_AHEAD)
      .then(function(ahead) {
        return behind.concat(ahead);
      });
    });
  },

  getHexCode: function(){ 
    return GetReq(routes.BULB_COLOR);
  }
};
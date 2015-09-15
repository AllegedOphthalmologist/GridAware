if(!process.env.DEPLOY){
  var tokens = require('./../../.tokens.js');
}
else{
  var tokens = {
    wattTimeAPIToken: process.env.wattTimeAPIToken
  }
}

module.exports = tokens;

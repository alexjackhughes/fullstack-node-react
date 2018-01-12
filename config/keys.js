if(process.env.NODE_ENV === 'production') {
  // we are in production return prod keys
  module.exports = require('prod.js');
} else {
  // return the dev keys
  module.exports = require('dev.js');
}

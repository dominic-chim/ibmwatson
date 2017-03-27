'use strict';

require('dotenv').config({silent: true});

var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
var debug = require('debug')('bot:server');



var server = require('./app');


server.listen(port, function() {
  // eslint-disable-next-line
  console.log('Server running on port: %d', port);
});

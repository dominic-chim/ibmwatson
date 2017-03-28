'use strict';

require('dotenv').config({silent: true});
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var rateLimit = require('express-rate-limit');
var helmet = require('helmet');
var http = require('http').Server(app);

var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
var debug = require('debug')('bot:server');

// Deployment tracking
require('cf-deployment-tracker-client').track();

// configure express
app.use(helmet());
app.use('/api/', rateLimit({
  windowMs: 60 * 1000, // seconds
  delayMs: 0,
  max: 15
}));
app.use(bodyParser.json());
app.use(express.static('public'));

var server = require('./app');

server.listen(port, function() {
  // eslint-disable-next-line
  console.log('Server running on port: %d', port);
});

module.exports = http
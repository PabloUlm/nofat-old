exports.default = function () {
  const express = require('express');
  const fileUpload = require('express-fileupload');
  const mongoose = require('mongoose');
  const config = require('./config.json');
  const errorHandler = require('_helpers/error-handler');

  mongoose.connect(config.connectionString, {
    useNewUrlParser: true
  });

  const backend = express.Router();

  backend.use(errorHandler);
  backend.use(fileUpload());

  backend.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  var template = require('./exercises/template.js');
  backend.get('/exercises/template', template.get);

  var upload = require('./exercises/exercises.upload.js');
  backend.post('/', upload.post);

  return backend;
}
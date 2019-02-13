var app = require('express')();
var fileUpload = require('express-fileupload');
var server = require('http').Server(app);
var mongoose = require('mongoose');
var config = require('./config.json');

app.use(fileUpload());

server.listen(4000);

mongoose.connect(config.connectionString, {
  useNewUrlParser: true
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var template = require('./exercises/template.js');
app.get('/exercises/template', template.get);

var upload = require('./exercises/exercises.upload.js');
app.post('/', upload.post);

// https://code.tutsplus.com/articles/bulk-import-a-csv-file-into-mongodb-using-mongoose-with-nodejs--cms-29574
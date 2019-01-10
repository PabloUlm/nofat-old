var app = require('express')();
var fileUpload = require('express-fileupload');
var server = require('http').Server(app);
 
app.use(fileUpload());
 
server.listen(4000);
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var template = require('./exercises/template.js');
app.get('/exercises/template', template.get);

//https://code.tutsplus.com/articles/bulk-import-a-csv-file-into-mongodb-using-mongoose-with-nodejs--cms-29574
require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', require('./api').default());
app.use('/backend', require('./backend').default());

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
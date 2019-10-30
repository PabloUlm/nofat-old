var json2csv = require('json2csv').parse;

exports.get = function (req, res) {

  var data = [{
    'id': 23,
    'name': 'pushups',
    'difficulty': 6,
    'description': 'Some example of description',
    'url': '/path/pushups.gif'
  }];

  var fields = [
    'id',
    'name',
    'difficulty',
    'description',
    'url'
  ];

  var csv = json2csv(data, fields);

  res.set("Content-Disposition", "attachment;filename=exercises.csv");
  res.set("Content-Type", "application/octet-stream");

  res.send(csv);

};
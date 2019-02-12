var csv = require('fast-csv');
var mongoose = require('mongoose');
var Exercises = require('./exercises.model');
 
exports.post = function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
     
    var exercisesFile = req.files.file;
 
    var exercises = [];
        
    // console.log(convertToHex('12'));
    csv
     .fromString(exercisesFile.data.toString(), {
         headers: true,
         ignoreEmpty: true
     })
     .on("data", function(data){
        data['_id'] = new mongoose.Types.ObjectId(convertToHex(data.id));
        exercises.push(data);
     })
     .on("end", function(){
        Exercises.create(exercises, function(err, documents) {
            if (err) throw err;
         });
          
         res.send(exercises.length + ' exercises have been successfully uploaded.');
     });
};

function convertToHex(id) {
    var hexBase = '000000000000000000000000';
    return hexBase.substring(id.length) + id;
}
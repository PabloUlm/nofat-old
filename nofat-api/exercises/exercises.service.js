var config = require('config.json');
var db = require('_helpers/db');
var Exercise = db.Exercise;

module.exports = {
    getAll,
}

async function getAll() {
    return await Exercise.find();
}
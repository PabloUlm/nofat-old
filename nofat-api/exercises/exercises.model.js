var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    difficulty: { type: Number, required: true },
    description: { type: String },
    url: { type: String }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Exercises', schema);
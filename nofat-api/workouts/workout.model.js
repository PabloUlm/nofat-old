var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  // seasonId: { type: String, required: true },
  week: {
    type: Number,
    required: true
  },
  mode: {
    type: String,
    required: true
  },
  // repetitions 0 minutes 1
});

schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Workout', schema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  workoutId: {
    type: Schema.Types.ObjectId,
    ref: 'Workout'
  },
  exerciseId: {
    type: Schema.Types.ObjectId,
    ref: 'Exercises'
  },
  qty: {
    type: Number
  }
});

schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('WorkoutExercise', schema);
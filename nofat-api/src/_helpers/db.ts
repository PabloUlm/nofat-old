const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
  User: require('../users/user.model'),
  Achievement: require('../achievement/achievement.model'),
  Workout: require('../workouts/workout.model'),
  Exercise: require('../exercises/exercises.model'),
  WorkoutExercise: require('../workoutExercise/workoutExercise.model'),
};
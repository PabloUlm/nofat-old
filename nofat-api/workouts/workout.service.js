var mongoose = require('mongoose');
var db = require('_helpers/db');
var workoutExercise = require('../workoutExercise/workoutExercise.service');
var Workout = db.Workout;
// const Season = db.Season;
// Sessions will be added in the future

module.exports = {
  add
};

async function add(params) {
  var workout = new Workout();

  // Get session id number
  var sessionId = 0; // TODO: Missing session logic

  // Get week number of the year
  var dt = new Date();
  var week = week_no(dt);
  workout.week = week;

  // Get workout id
  workout['_id'] = new mongoose.Types.ObjectId(convertToHex(sessionId.toString(), week.toString()));

  // Get mode
  workout.mode = params.mode;

  // validate
  if (await Workout.findOne({
      _id: workout['_id']
    })) {
    // Delete old workoutExercises related to this workout
    workoutExercise.deleteByWorkoutId(workout['_id']);

    // TODO: save new mode into the repeated one

    // Add new ones
    saveWorkoutExercises(workout['_id'], params);
  } else {
    // Save new workout and add exercises
    await workout.save()
      .then(
        res => {
          if (!params.exercises || params.exercises.length === 0) {
            throw 'Error: There are not exercises available';
          }

          if (!res) {
            throw 'Error: save function response is NULL';
          }

          saveWorkoutExercises(res['_id'], params);
        }
      )
      .catch(err => {
        console.log(err);
      });
  }

  return params;
}

function convertToHex(sessionId, week) {
  var hexBase = '000000000000000000000000';
  hexBase = hexBase.substring(week.length) + week;
  return sessionId + hexBase.substring(sessionId.length);
}

function saveWorkoutExercises(workoutId, params) {
  for (var i = 0; i < params.exercises.length; i++) {
    workoutExercise.add(
      workoutId,
      params.exercises[i].exercise,
      params.exercises[i].qty);
  }
}


function week_no(dt) {
  var tdt = new Date(dt.valueOf());
  var dayn = (dt.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  var firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4) {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}

// dt = new Date();
// console.log(ISO8601_week_no(dt));

// dt = new Date(2015, 10, 1);
// console.log(ISO8601_week_no(dt));
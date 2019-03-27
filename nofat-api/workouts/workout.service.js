var mongoose = require('mongoose');
var db = require('_helpers/db');
var workoutExercise = require('../workoutExercise/workoutExercise.service');
var Workout = db.Workout;
// const Season = db.Season;
// Sessions will be added in the future

const SESSION_ID = 0;

module.exports = {
  add,
  getCurrentWorkout
};

async function add(params) {
  var workout = new Workout();

  // Get week number of the year
  var week = getCurrentWeekNumber();
  workout.week = week;

  // Get workout id
  workout['_id'] = new mongoose.Types.ObjectId(convertToHex(SESSION_ID, week.toString()));

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

async function getCurrentWorkout() {
  var id = convertToHex(SESSION_ID, getCurrentWeekNumber());

  return await Workout.findById({
    _id: id
  }).then(w => {
    if (w) {
      return workoutExercise.getByWorkoutId(id).then(res => {
        return {
          mode: w.mode,
          week: w.week,
          workoutExercises: res
        };
      }).catch(err => {
        console.log(err);
      });
    }
  }).catch(err => {
    console.log(err);
  });
}

function getCurrentWeekNumber() {
  var dt = new Date();
  return week_no(dt);
}

/**
 * 
 * @param {number} sessionId 
 * @param {number} week 
 */
function convertToHex(sessionId, week) {
  var sessionIdString = sessionId.toString();
  var weekString = week.toString();
  var hexBase = '000000000000000000000000';
  var hexBaseWithSlots = hexBase.substring(sessionIdString.length + weekString.length);
  return sessionIdString + hexBaseWithSlots + weekString;
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
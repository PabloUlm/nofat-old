var db = require('_helpers/db');
var WorkoutExercise = db.WorkoutExercise;
var Exercise = db.Exercise;
// const Season = db.Season;
// Sessions will be added in the future

module.exports = {
    add,
    deleteByWorkoutId
};

async function add(workoutId, exerciseId, qty) {
    var workoutExercise = new WorkoutExercise();
    workoutExercise.workoutId = workoutId;

    // Check if exercise id is valid
    if (await Exercise.findOne({ id: exerciseId })) {
        workoutExercise.exerciseId = exerciseId;
        workoutExercise.qty = qty;

        await workoutExercise.save();
    } else {
        throw 'Error: Exercise with id ' + exerciseId + ' does NOT exist';
    }
}

async function deleteByWorkoutId(workoutId) {
    await WorkoutExercise.find({workoutId: workoutId}).remove().exec();
}
const db = require('_helpers/db');
const Workout = db.UserWorkout;

module.exports = {
    getByUserAndWorkout,
    create,
    delete: _delete
};

async function getByUserAndWorkout(userId, workoutId) {

}

async function create(workoutParam) {

}

async function _delete(id) {
    await Workout.findByIdAndRemove(id);
}
const db = require('_helpers/db');
const achievement = db.achievement;

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
    await achievement.findByIdAndRemove(id);
}
const db = require('_helpers/db');
const Season = db.Season;

module.exports = {
    getById,
    create,
    delete: _delete
};

async function getById(id) {
    // return await Workout.findById(id).select('-hash');
}

async function create(workoutParam) {
    // validate
    // if (await Workout.findOne({ week: workoutParam.week })) {
    //     throw 'The week ' + workoutParam.week + ' from season "' + workoutParam.season + '" is already taken';
    // }

    // const workout = new Workout(workoutParam);

    // save user
    // await workout.save();
}

async function _delete(id) {
    // await Season.findByIdAndRemove(id);
}
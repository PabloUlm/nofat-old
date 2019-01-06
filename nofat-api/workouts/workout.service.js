const db = require('_helpers/db');
const Workout = db.Workout;
// const Season = db.Season;
// Sessions will be added in the future

module.exports = {
    add
};

async function add(params) {
    // temporal
    const workout = new Workout(params);
    workout.id = '1';

    // save workout
    await workout.save();

    return params;
}
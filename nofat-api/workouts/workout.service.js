const db = require('_helpers/db');
const Workout = db.Workout;
const Season = db.Season;

module.exports = {
    getById,
    create,
    delete: _delete
};

async function getById(id) {
    return await Workout.findById(id).select('-hash');
}

async function create(workoutParam) {
    // validate
    if (await Workout.findOne({ week: workoutParam.week })) {
        throw 'The week ' + workoutParam.week + ' from season "' + workoutParam.season + '" is already taken';
    }

    // const workout = new Workout(workoutParam);

    // save user
    // await workout.save();
}

// async function update(id, userParam) {
//     const user = await User.findById(id);

//     // validate
//     if (!user) throw 'User not found';
//     if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
//         throw 'Username "' + userParam.username + '" is already taken';
//     }

//     // hash password if it was entered
//     if (userParam.password) {
//         userParam.hash = bcrypt.hashSync(userParam.password, 10);
//     }

//     // copy userParam properties to user
//     Object.assign(user, userParam);

//     await user.save();
// }

async function _delete(id) {
    await Workout.findByIdAndRemove(id);
}
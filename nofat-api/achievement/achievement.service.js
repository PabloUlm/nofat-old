const db = require('_helpers/db');
const Achievement = db.Achievement;

module.exports = {
    add
};

async function add(params) {
    if (params.workoutId && params.userId && params.description) {
        // TODO: check if user and workout exist
        const achievement = new Achievement(params);
        
        // Save achievement
        achievement.save();
        return 'Success!';
    }

    return params;
    // const user = await Achievement.findOne({ username });
}
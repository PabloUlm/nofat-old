const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    workout_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    achievement: { type: Text, required: false },
    photo_url: { type: Text, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('user-Workout', schema);
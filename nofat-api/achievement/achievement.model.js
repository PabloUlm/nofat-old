const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: { type: Number, required: true },
    workout_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    achievement: { type: Text, required: false },
    photo_url: { type: Text, required: true },
    video_url: { type: Text, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('achievement', schema);
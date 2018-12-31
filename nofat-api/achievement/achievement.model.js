const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: { type: Number, required: true },
    workoutId: { type: Number, required: true },
    userId: { type: Number, required: true },
    description: { type: String, required: false },
    photoUrl: { type: String, required: true },
    videoUrl: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Achievement', schema);
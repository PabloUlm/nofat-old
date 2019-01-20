const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: {  type: Number, required: true },
    // seasonId: { type: String, required: true },
    week: { type: Number },
    difficulty: { type: Number, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Workout', schema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: {  type: String, required: true },
    // seasonId: { type: String, required: true },
    week: { type: Number, required: true },
    mode: { type: String, required: true },
    // repetitions 0 minutes 1
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Workout', schema);
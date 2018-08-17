const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    week: { type: Number, required: true },
    description: { type: string, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Workout', schema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: {  type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Workout', schema);
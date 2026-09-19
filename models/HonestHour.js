// models/HonestHour.js
const mongoose = require('mongoose');

const honestHourSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        enum: ['Calculus', 'Physics', 'Computer Science', 'Exam Prep', 'Other']
    },
    durationMinutes: {
        type: Number,
        required: true,
        default: 60
    },
    focusRating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    notes: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('HonestHour', honestHourSchema);
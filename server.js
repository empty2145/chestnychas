// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const HonestHour = require('./models/HonestHour');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.post('/api/sessions', async (requestAnimationFrame, res) => {
    try {
        const { subject, durationMinutes, focusRating, notes } = req.body;
        const newSession = new HonestHour({ subject, durationMinutes, focusRating, notes });
        await newSession.save();
        res.status(201).json({ message: 'Session logged', data: newSession});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
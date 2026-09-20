// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const HonestHour = require('./models/HonestHour');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.post('/api/sessions', async (req, res) => {
    try {
        const { subject, durationMinutes, focusRating, notes } = req.body;
        const newSession = new HonestHour({ subject, durationMinutes, focusRating, notes });
        await newSession.save();
        res.status(201).json({ message: 'Session logged', data: newSession});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/stats', async (req, res) => {
    try {
        const stats = await HonestHour.aggregate([
            {
                $group: {
                    _id: "subject",
                    totalMinutes: { $sum: "$durationMinutes" },
                    averageFocus: { $avg: "$focusRating"}
                }
            },
            {
                $project: {
                    subject: "$_id",
                    totalHours: { $divide: ["$totalMinutes", 60]},
                    averageFocus: { $round: ["$averageFocus", 1]},
                    _id: 0
                }
            }
        ]);
        res.status(200).json(stats);
    } catch (error) {
        console.error("Aggregation Error:", error);
        res.status(500).json({ error: error.message });
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Chestnychas API running on port ${PORT}`));
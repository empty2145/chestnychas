// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const HonestHour = require('./models/HonestHour');

const app = express();
app.use(express.json());

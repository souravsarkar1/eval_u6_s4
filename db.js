const mongoose = require('mongoose');
require('dotenv').config()
const connectiion = mongoose.connect(process.env.baseURL);

module.exports = { connectiion };
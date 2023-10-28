const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');
const connectDB = require('./config/database');
require('dotenv').config();

connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use('/public', express.static(__dirname + '/public'));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(logger('dev'));

// Routers
const adminRouter = require('./routes/adminRouter');
const contentRouter = require('./routes/contentRouter');
const imageRouter = require('./routes/imageRouter');

app.use('/admin', adminRouter);
app.use('/admin/content', contentRouter);
app.use('/image', imageRouter);



app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`));
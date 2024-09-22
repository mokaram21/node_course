require('dotenv').config()
const express = require('express');

const cors = require('cors');
const mongoose = require('mongoose');
const error = require('./utils/appError');
const httpStatusText = require('./utils/httpStatusText')
const path = require('path');
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const url = process.env.MONOGO_URL;
mongoose.connect(url).then(() => {
    console.log('mongodb connect started');
})
app.use(cors())
app.use(express.json());
const coursesRouter = require('./routes/courses.route');
const usersRouter = require('./routes/users.route');
app.use('/api/courses', coursesRouter)
app.use('/api/users',usersRouter)
app.all('*', (req, res, next) => {
        return res.status(404).json({status: httpStatusText.ERROR, message:'this resoures not avalobal'});
})
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statusText ||httpStatusText.ERROR, message: error.message ,code:error.statusCode || 500,data:null});
});

app.listen(process.env.PORT, () => {
    console.log('listening on port : 4000');
});
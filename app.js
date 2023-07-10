const express = require('express');
const morgan = require('morgan');

const emailRouter = require('./routes/emailRoutes');

const app = express();

//middlewares
app.use(morgan('dev'));

app.use(express.json());


//routes
app.use('/api/v1', emailRouter);

module.exports = app;
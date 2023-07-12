const express = require('express');
const morgan = require('morgan');

const emailRouter = require('./routes/emailRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//middlewares
app.use(morgan('dev'));

app.use(express.json());


//routes
app.use('/api/v1', emailRouter);

app.all('*', (req, res, next) => {
    next(new AppError('cant find the url'));
});

app.use(globalErrorHandler)

module.exports = app;
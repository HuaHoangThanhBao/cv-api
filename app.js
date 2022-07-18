const express = require('express');

const blockRoutes = require('./routes/blockRoutes');
const globalErrHandler = require('./controllers/errorController');
const AppError = require('./utils/apiError');
const app = express();

// Body parser, reading data from body into req.body
app.use(express.json());

// Routes
app.use('/api/v1/blocks', blockRoutes);

// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;
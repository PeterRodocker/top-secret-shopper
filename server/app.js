// IMPORTS
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

const PORT = 1337;

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

// Static file-serving middleware
app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'public')));

app.use(express.static(path.join(__dirname, "..", "public")));

/*
  404 Error handling for extensions
This middleware checks if the requested path has a file extension. If it does and hasn't been handled by previous middleware/routes, it's considered a 404 error.
*/
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// For any route that hasn't been explicitly defined, this will just send the main file from the 'public' directory
app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public'))
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// Starts the server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});

module.exports = app;
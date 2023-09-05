const express = require('express');
const app = express();
const ViteExpress = require('vite-express');
const path = require('path');
const morgan = require('morgan');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'public')));

app.post('/help', (req, res, next) => {
  console.log('HELP!!!'),
    res.send('Nailed it');
})

app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public'))
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

const PORT = 1337;
ViteExpress.listen(app, PORT, () => {
  console.log(`listening on port ${PORT}`)
});

module.exports = app;
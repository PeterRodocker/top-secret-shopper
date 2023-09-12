const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

const PORT = 1337;

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

app.get("/message", (_, res) => res.send("Hello from express!"));

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'public')));

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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});

module.exports = app;
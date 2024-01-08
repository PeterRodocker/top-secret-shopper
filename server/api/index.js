// IMPORTS
const router = require('express').Router();

// Attach routes to router
router.use('/address', require('./address'))
router.use('/cart', require('./cart'))
router.use('/categories', require('./categories'))
router.use('/products', require('./products'))
router.use('/users', require('./users'))

// Error handling
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
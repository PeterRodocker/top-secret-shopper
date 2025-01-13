const router = require('express').Router();

const { models: { Address } } = require('../database');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');

// Get all addresses /api/address
router.get('/', requireToken, async (req, res, next) => {
  try {
    const address = await Address.findAll({
      where:
        { userId: req.user.id }
    })
    res.send(address)
  } catch (err) {
    next(err)
  }
})

// Post new address /api/address
router.post('/', requireToken, async (req, res, next) => {
  try {
    const address = await Address.create({
      userId: req.user.id,
      street: req.body.street,
      unit: req.body.unit,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      isPrimary: req.body.isPrimary,
    })
    res.send(address)
  } catch (err) {
    next(err)
  }
})

router.put('/', requireToken, async (req, res, next) => {
  try {
    res.send('put')
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', requireToken, async (req, res, next) => {
  try {
    const address = await Address.destroy({
      where: [{ id: req.params.id }, { userId: req.user.id }]
    });
    if (address === 0) {
      res.status(404).send('Address not found');
    } else {
      res.status(200).send('Address deleted successfully');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
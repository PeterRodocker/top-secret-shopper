// IMPORTS
const router = require('express').Router();
const { models: { Card } } = require('../database');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');

// Get all cards /api/card
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const cards = await Card.findAll({ where: { userId: req.user.id } });
    res.send(cards);
  } catch (err) {
    next(err);
  }
});

// Get individual card for an individual /api/cards
router.get('/:id', requireToken, async (req, res, next) => {
  try {
    const card = await Card.findOne({
      where: [
        { id: req.params.id },
        { userId: req.user.id }
      ]
    });
    res.send(card);
  } catch (err) {
    next(err);
  }
});

// Post new address /api/address
router.post('/', requireToken, async (req, res, next) => {
  try {
    const card = await Card.create({
      userId: req.user.id,
      name: req.body.name,
      type: req.body.type,
      number: req.body.number,
      exp: req.body.exp,
      cvv: req.body.cvv,
      nickname: req.body.nickname,
    })
    res.send(card)
  } catch (err) {
    next(err)
  }
})

// Post card /api/card/verify
router.post('/verify', requireToken, async (req, res, next) => {
  try {
    const card = await Card.findOne({
      where: {
        cvv: req.body.cvv,
        expMonth: req.body.expMonth,
        expYear: req.body.expYear,
        userId: req.user.id
      },
      attributes: { exclude: ['cvv', 'exp'] }
    });
    res.send(card);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireToken, async (req, res, next) => {
  try {
    const card = await Card.destroy({
      where: [
        { id: req.params.id },
        { userId: req.user.id }
      ]
    });
    if (card === 0) {
      res.status(404).send('Card not found');
    } else {
      res.status(200).send('Card deleted successfully');
    }
  } catch (err) {
    next(err);
  }
});


module.exports = router;



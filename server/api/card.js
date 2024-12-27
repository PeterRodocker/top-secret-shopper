// IMPORTS
const router = require('express').Router();
const { models: { Card } } = require('../database');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');

// Get all cards /api/card
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const cards = await Card.findAll();
    res.send(cards);
  } catch (err) {
    next(err);
  }
});

// Get individual card for an individual /api/cards
router.get('/:cardId/user/:userId', requireToken, async (req, res, next) => {
  try {
    const card = await Card.findOne({
      where: [{ id: req.params.cardId }, { userId: req.params.userId }]
    });
    res.send(card);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/method/:pmId', requireToken, async (req, res, next) => {
  console.log('***Single Individual card***')
  try {
    const user = await Card.findOne({
      where: [{ userId: req.params.id }, { id: req.params.pmId }]
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// Post card /api/card/verify
router.post('/verify', async (req, res, next) => {
  try {
    const { cvv, exp, userId } = req.body
    const card = await Card.findOne({
      where: { cvv: cvv, exp: exp, userId: userId },
      attributes: { exclude: ['cvv', 'exp'] }
    });
    res.send(card);
  } catch (err) {
    next(err);
  }
});

// Post verify-card /api/card

// Post card /api/cards
// router.put('/update', requireToken, async (req, res, next) => {
//   try {
//     const { profileFields, profileFields: { id, addresses } } = req.body
//     const user = await Card.findByPk(id);
//     await user.update(profileFields);
//     await Promise.all(addresses.map(async address =>
//       await Address.update(address, { where: { id: address.id } })))
//     const updatedUser = await Card.findByPk(id, {
//       include: Address
//     });
//     res.send(updatedUser);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;



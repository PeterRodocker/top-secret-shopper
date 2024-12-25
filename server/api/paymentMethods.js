// IMPORTS
const router = require('express').Router();
const { models: { PaymentMethod } } = require('../database');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');

// Get all paymentMethods /api/paymentMethods
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const paymentMethods = await PaymentMethod.findAll();
    res.send(paymentMethods);
  } catch (err) {
    next(err);
  }
});

// Get paymentMethods for an individual /api/paymentMethods
router.get('/:id/:pmId', requireToken, async (req, res, next) => {
  console.log('***Individuals paymentMethods***')
  try {
    const user = await PaymentMethod.findAll({
      where: { userId: req.params.id }
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/method/:pmId', requireToken, async (req, res, next) => {
  console.log('***Single Individual paymentMethod***')
  try {
    const user = await PaymentMethod.findOne({
      where: [{ userId: req.params.id }, { id: req.params.pmId }]
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// Post paymentMethod /api/paymentMethods
// router.post('/', async (req, res, next) => {
//   try {
//     const paymentMethod = await PaymentMethod.create(req.body);
//     res.send(paymentMethod);
//   } catch (err) {
//     next(err);
//   }
// });

// Post paymentMethod /api/paymentMethods
// router.put('/update', requireToken, async (req, res, next) => {
//   try {
//     const { profileFields, profileFields: { id, addresses } } = req.body
//     const user = await PaymentMethod.findByPk(id);
//     await user.update(profileFields);
//     await Promise.all(addresses.map(async address =>
//       await Address.update(address, { where: { id: address.id } })))
//     const updatedUser = await PaymentMethod.findByPk(id, {
//       include: Address
//     });
//     res.send(updatedUser);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;



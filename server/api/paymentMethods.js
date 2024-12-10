// IMPORTS
const router = require('express').Router();
const { models: { PaymentMethod } } = require('../database');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');

// Get all paymentMethods /api/users
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const paymentMethods = await PaymentMethod.findAll();
    res.send(paymentMethods);
  } catch (err) {
    next(err);
  }
});

// Get single user /api/users
// router.get('/:id', requireToken, async (req, res, next) => {
//   try {
//     const user = await PaymentMethod.findOne({
//       where: { id: req.params.id },
//     });
//     res.send(user);
//   } catch (err) {
//     next(err);
//   }
// });

// Post user /api/users
// router.post('/', async (req, res, next) => {
//   try {
//     const user = await PaymentMethod.create(req.body);
//     res.send(user);
//   } catch (err) {
//     next(err);
//   }
// });

// Post user /api/users
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



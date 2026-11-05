const router = require('express').Router();
const Service = require('../models/Service');
const { protect, onlyRole } = require('../middleware/auth');

router.post('/', protect, onlyRole('provider'), async (req, res) => {
  const service = await Service.create({ ...req.body, providerId: req.user.id });
  res.status(201).json(service);
});

router.get('/', async (req, res) => {
  const { category, city, maxPrice } = req.query;
  const filter = {};
  if (category) filter.category = new RegExp(category, 'i');
  if (city) filter.city = new RegExp(city, 'i');
  if (maxPrice) filter.price = { $lte: Number(maxPrice) };
  res.json(await Service.find(filter).populate('providerId', 'name phone'));
});

router.get('/:id', async (req, res) => {
  res.json(await Service.findById(req.params.id).populate('providerId', 'name phone'));
});

module.exports = router;
const router = require('express').Router();
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const { protect, onlyRole } = require('../middleware/auth');

router.post('/', protect, onlyRole('customer'), async (req, res) => {
  const { serviceId, date, slot, address } = req.body;
  const service = await Service.findOneAndUpdate(
    { _id: serviceId, availability: { $elemMatch: { date, slots: slot } } },
    { $pull: { 'availability.$.slots': slot } },
    { new: true }
  );
  if (!service) return res.status(409).json({ msg: 'Slot no longer available' });

  const booking = await Booking.create({
    customerId: req.user.id, serviceId,
    providerId: service.providerId, date, slot, address
  });
  res.status(201).json(booking);
});

router.get('/mine', protect, async (req, res) => {
  const filter = req.user.role === 'provider'
    ? { providerId: req.user.id } : { customerId: req.user.id };
  res.json(await Booking.find(filter).populate('serviceId', 'title category').sort('-createdAt'));
});

module.exports = router;
const mongoose = require('mongoose');
module.exports = mongoose.model('Booking', new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  slot: String,
  address: String,
  status: { type: String, enum: ['pending','confirmed','completed','cancelled'], default: 'pending' }
}, { timestamps: true }));
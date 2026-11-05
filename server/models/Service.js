const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: String,
  title: String,
  price: Number,
  city: String,
  availability: [{ date: String, slots: [String] }],
  avgRating: { type: Number, default: 0 }
});
schema.index({ category: 1, city: 1 });
module.exports = mongoose.model('Service', schema);
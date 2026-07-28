const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String, default: '' },
  phone: { type: String, default: '' },
  addresses: [{
    label: String,
    street: String,
    city: String,
    province: String,
    postalCode: String,
    country: { type: String, default: 'Pakistan' },
    isDefault: Boolean
  }],
  stylePreferences: {
    fit: { type: String, default: 'Tailored Fit' },
    favoriteColors: [String],
    occasions: [String],
    budgetRange: { min: Number, max: Number },
    bodyType: String
  },
  dhajScoreHistory: [{
    score: Number,
    date: { type: Date, default: Date.now },
    lookName: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

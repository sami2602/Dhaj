const mongoose = require('mongoose');

const wardrobeItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  category: { type: String, required: true }, // 'Kurta', 'Waistcoat', 'Pajama', 'Shoes', 'Shawl'
  color: { type: String, default: 'Black' },
  image: { type: String, required: true },
  aiTags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WardrobeItem', wardrobeItemSchema);

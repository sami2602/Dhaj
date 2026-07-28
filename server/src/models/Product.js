const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subtitle: { type: String, default: '' },
  description: { type: String, required: true },
  details: [String],
  price: { type: Number, required: true },
  salePrice: { type: Number, default: null },
  isNewArrival: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isOnSale: { type: Boolean, default: false },
  category: { type: String, required: true }, // 'kurta', 'waistcoat', 'sherwani', 'prince-suit', 'shawl', 'footwear', 'accessories'
  collectionName: { type: String, default: 'Royal Heritage' },
  images: [{ type: String }],
  video: { type: String, default: '' },
  colors: [{
    name: String,
    hex: String,
    image: String
  }],
  sizes: [{
    size: String, // 'S', 'M', 'L', 'XL', 'Custom Tailored'
    stock: Number
  }],
  fabric: { type: String, default: 'Raw Silk' },
  craftsmanship: { type: String, default: 'Hand Embroidered Tilla & Zardozi' },
  fit: { type: String, default: 'Modern Slim Fit' },
  occasions: [{ type: String }], // 'Eid', 'Wedding', 'Mehndi', 'Valima', 'Formal Evening', 'Groom'
  season: { type: String, default: 'All Season' },
  rating: { type: Number, default: 4.9 },
  reviewsCount: { type: Number, default: 28 },
  completeLookProductIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);

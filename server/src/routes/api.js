const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const aiController = require('../controllers/aiController');
const orderController = require('../controllers/orderController');

// Middleware dummy auth for dev/testing
const mockAuth = (req, res, next) => {
  req.user = { id: 'u_demo', role: 'user' };
  next();
};

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/profile', mockAuth, authController.getProfile);

// Product Routes
router.get('/products', productController.getProducts);
router.get('/products/:slug', productController.getProductBySlug);

// Categories & Collections
router.get('/categories', (req, res) => {
  res.json({
    success: true,
    categories: [
      { id: 'kurta', name: 'Festive Kurtas', count: 18, image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=600' },
      { id: 'waistcoat', name: 'Luxury Waistcoats', count: 14, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600' },
      { id: 'sherwani', name: 'Royal Sherwanis', count: 9, image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=600' },
      { id: 'prince-suit', name: 'Prince Suits', count: 11, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600' },
      { id: 'shawl', name: 'Heritage Shawls', count: 8, image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600' },
      { id: 'footwear', name: 'Crafted Khussas', count: 12, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600' }
    ]
  });
});

router.get('/collections', (req, res) => {
  res.json({
    success: true,
    collections: [
      { id: 'royal-heritage', title: 'Royal Heritage 2026', subtitle: 'Imperious Black Velvet & Gold Tilla', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000' },
      { id: 'sovereign-velvet', title: 'Sovereign Velvet Edition', subtitle: 'Heavy Hand Embroidery for Grooms', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=1000' },
      { id: 'modern-minimalist', title: 'Modern Minimalist', subtitle: 'Clean Monochrome Lines & Raw Silk', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1000' }
    ]
  });
});

// AI Routes
router.post('/ai/search', aiController.parseNaturalLanguageSearch);
router.post('/ai/find-your-dhaj', aiController.calculateDhajQuiz);
router.get('/ai/complete-look/:productId', aiController.getCompleteLook);
router.post('/ai/virtual-wardrobe/match', aiController.matchWardrobe);

// Orders Routes
router.post('/orders', mockAuth, orderController.createOrder);
router.get('/orders/my-orders', mockAuth, orderController.getUserOrders);

// Admin Routes (Metrics & Analytics)
router.get('/admin/metrics', (req, res) => {
  res.json({
    success: true,
    metrics: {
      totalRevenue: 1485000,
      totalOrders: 142,
      activeUsers: 890,
      averageDhajScore: 94.6,
      topCategory: 'Luxury Waistcoats',
      aiConsultations: 1240
    }
  });
});

module.exports = router;

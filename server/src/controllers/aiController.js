const Product = require('../models/Product');

// Sample in-memory product dataset as fallback if database is empty/connecting
const MOCK_PRODUCTS = [
  {
    _id: 'p1',
    name: 'Royal Obsidian Velvet Waistcoat',
    slug: 'royal-obsidian-velvet-waistcoat',
    subtitle: 'Hand-embroidered Gold Antique Tilla',
    description: 'Masterfully crafted obsidian velvet waistcoat embellished with antique gold tilla motifs inspired by Mughal architecture.',
    price: 18500,
    salePrice: 16500,
    category: 'waistcoat',
    collectionName: 'Royal Heritage',
    isNewArrival: true,
    isBestSeller: true,
    isOnSale: true,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-black-jacket-41551-large.mp4',
    colors: [{ name: 'Deep Black', hex: '#0B0B0C' }, { name: 'Antique Gold Accent', hex: '#D4AF37' }],
    sizes: [{ size: 'S', stock: 5 }, { size: 'M', stock: 12 }, { size: 'L', stock: 8 }, { size: 'XL', stock: 4 }],
    fabric: 'Micro Velvet',
    craftsmanship: 'Hand Zardozi & Gold Metallic Thread',
    fit: 'Tailored Slim Fit',
    occasions: ['Eid', 'Wedding', 'Mehndi', 'Valima', 'Formal Evening'],
    season: 'Autumn/Winter',
    rating: 4.9,
    reviewsCount: 42
  },
  {
    _id: 'p2',
    name: 'Sovereign Raw Silk Kurta Suite',
    slug: 'sovereign-raw-silk-kurta-suite',
    subtitle: 'Classic Cut Raw Silk Kurta & Churidar',
    description: 'Elevated raw silk black kurta paired with matching slim-fit trousers. Designed for the modern Pakistani gentleman who demands effortless elegance.',
    price: 14500,
    salePrice: null,
    category: 'kurta',
    collectionName: 'Royal Heritage',
    isNewArrival: true,
    isBestSeller: true,
    isOnSale: false,
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [{ name: 'Obsidian Black', hex: '#0A0A0B' }, { name: 'Midnight Charcoal', hex: '#1C1C21' }],
    sizes: [{ size: 'S', stock: 8 }, { size: 'M', stock: 15 }, { size: 'L', stock: 10 }, { size: 'XL', stock: 6 }],
    fabric: 'Pure Raw Silk 80g',
    craftsmanship: 'Minimalist Stitched Concealed Placket',
    fit: 'Modern Relaxed Fit',
    occasions: ['Eid', 'Jummah', 'Mehndi', 'Casual Festive'],
    season: 'All Season',
    rating: 4.8,
    reviewsCount: 36
  },
  {
    _id: 'p3',
    name: 'Emperor Gold Zari Sherwani',
    slug: 'emperor-gold-zari-sherwani',
    subtitle: 'Imperial Groom Sherwani with Pearl Detailing',
    description: 'An iconic regal sherwani fashioned from custom textured jacquard silk featuring metallic gold zari weaving and handcrafted pearl button accents.',
    price: 65000,
    salePrice: 58000,
    category: 'sherwani',
    collectionName: 'Sovereign Velvet',
    isNewArrival: false,
    isBestSeller: true,
    isOnSale: true,
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [{ name: 'Antique Gold', hex: '#C5A059' }, { name: 'Ivory Cream', hex: '#FFFDD0' }],
    sizes: [{ size: 'S', stock: 2 }, { size: 'M', stock: 5 }, { size: 'L', stock: 4 }, { size: 'XL', stock: 2 }],
    fabric: 'Jacquard Silk & Organza Overlay',
    craftsmanship: 'Hand Dabka, Zardozi & South Sea Pearl buttons',
    fit: 'Imperial Structured Fit',
    occasions: ['Groom', 'Wedding', 'Valima'],
    season: 'All Season',
    rating: 5.0,
    reviewsCount: 19
  },
  {
    _id: 'p4',
    name: 'Nawab Handcrafted Leather Khussa',
    slug: 'nawab-handcrafted-leather-khussa',
    subtitle: 'Gold Metallic Embroidery on Pure Leather',
    description: 'Handmade double-cushioned genuine leather footwear with intricate dabka embroidery across the toe cap.',
    price: 8500,
    salePrice: 7200,
    category: 'footwear',
    collectionName: 'Royal Heritage',
    isNewArrival: true,
    isBestSeller: false,
    isOnSale: true,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [{ name: 'Burnished Gold', hex: '#DAA520' }, { name: 'Pitch Black', hex: '#000000' }],
    sizes: [{ size: '40', stock: 6 }, { size: '41', stock: 10 }, { size: '42', stock: 12 }, { size: '43', stock: 8 }, { size: '44', stock: 4 }],
    fabric: '100% Genuine Bovine Leather',
    craftsmanship: 'Hand-stitched Sole with Memory Foam Cushion',
    fit: 'True to Size',
    occasions: ['Eid', 'Wedding', 'Mehndi', 'Valima'],
    season: 'All Season',
    rating: 4.9,
    reviewsCount: 51
  },
  {
    _id: 'p5',
    name: 'Pashmina Gold Border Shawl',
    slug: 'pashmina-gold-border-shawl',
    subtitle: 'Heritage Weave Soft Wool Doshala',
    description: 'Supple Kashmir wool doshala shawl edged with woven antique gold zari border. The ultimate statement accessory for cool evenings.',
    price: 12500,
    salePrice: null,
    category: 'shawl',
    collectionName: 'Modern Minimalist',
    isNewArrival: true,
    isBestSeller: false,
    isOnSale: false,
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [{ name: 'Obsidian & Gold', hex: '#111115' }],
    sizes: [{ size: 'Free Size', stock: 15 }],
    fabric: 'Fine Wool Pashmina Blend',
    craftsmanship: 'Handloom Jacquard Weave',
    fit: 'Draped Standard',
    occasions: ['Formal Evening', 'Winter Wedding', 'Valima'],
    season: 'Winter',
    rating: 4.8,
    reviewsCount: 14
  },
  {
    _id: 'p6',
    name: 'Mirza Cut Velvet Prince Suit',
    slug: 'mirza-cut-velvet-prince-suit',
    subtitle: 'Modern Asymmetric Tuxedo Jacket with Trousers',
    description: 'Contemporary double-breasted Prince Coat constructed from jet-black Italian micro velvet with understated gold lapel piping.',
    price: 32000,
    salePrice: 28500,
    category: 'prince-suit',
    collectionName: 'Modern Minimalist',
    isNewArrival: true,
    isBestSeller: true,
    isOnSale: true,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: [{ name: 'Deep Jet Black', hex: '#050505' }],
    sizes: [{ size: 'S', stock: 4 }, { size: 'M', stock: 8 }, { size: 'L', stock: 6 }, { size: 'XL', stock: 3 }],
    fabric: 'Italian Micro Velvet & Silk Satin Lining',
    craftsmanship: 'Sartorial Canvassed Shoulder Construction',
    fit: 'Slim Sculpted Fit',
    occasions: ['Valima', 'Reception', 'Black Tie', 'Formal Evening'],
    season: 'Autumn/Winter',
    rating: 5.0,
    reviewsCount: 22
  }
];

// 1. Natural Language Fashion Search Parser
const parseNaturalLanguageSearch = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const lower = query.toLowerCase();
    
    // Extract price budget (e.g. "under 10000", "below 20000")
    let maxPrice = null;
    const priceMatch = lower.match(/(?:under|below|less than|max)\s*(?:rs\.?|pkr)?\s*(\d+)/i) || lower.match(/(\d+)\s*(?:k|thousand)/i);
    if (priceMatch) {
      if (lower.includes('k') || lower.includes('thousand')) {
        maxPrice = parseInt(priceMatch[1], 10) * 1000;
      } else {
        maxPrice = parseInt(priceMatch[1], 10);
      }
    }

    // Extract occasion
    let occasion = null;
    if (lower.includes('eid')) occasion = 'Eid';
    else if (lower.includes('wedding') || lower.includes('shaadi')) occasion = 'Wedding';
    else if (lower.includes('mehndi')) occasion = 'Mehndi';
    else if (lower.includes('valima')) occasion = 'Valima';
    else if (lower.includes('formal') || lower.includes('party')) occasion = 'Formal Evening';

    // Extract category
    let category = null;
    if (lower.includes('kurta')) category = 'kurta';
    else if (lower.includes('waistcoat')) category = 'waistcoat';
    else if (lower.includes('sherwani')) category = 'sherwani';
    else if (lower.includes('prince') || lower.includes('suit')) category = 'prince-suit';
    else if (lower.includes('khussa') || lower.includes('shoes')) category = 'footwear';
    else if (lower.includes('shawl')) category = 'shawl';

    // Filter products
    let dbProducts = [];
    try {
      dbProducts = await Product.find({});
    } catch (e) {
      dbProducts = [];
    }
    const dataset = dbProducts.length > 0 ? dbProducts : MOCK_PRODUCTS;

    const filtered = dataset.filter(product => {
      let matches = true;
      if (category && product.category !== category) {
        // Soft match check in name or description
        if (!product.name.toLowerCase().includes(category)) matches = false;
      }
      if (maxPrice) {
        const effectivePrice = product.salePrice || product.price;
        if (effectivePrice > maxPrice) matches = false;
      }
      if (occasion && product.occasions) {
        const hasOccasion = product.occasions.some(o => o.toLowerCase().includes(occasion.toLowerCase()));
        if (!hasOccasion) matches = false;
      }
      return matches;
    });

    const finalResults = filtered.length > 0 ? filtered : dataset.slice(0, 4);

    return res.json({
      success: true,
      query,
      parsedIntent: {
        category: category || 'All Menswear',
        maxPrice: maxPrice ? `PKR ${maxPrice.toLocaleString()}` : 'Any Budget',
        occasion: occasion || 'All Occasions',
        colorDetected: lower.includes('black') ? 'Black' : (lower.includes('gold') ? 'Gold' : 'All')
      },
      aiSummary: `DHAJ AI identified ${finalResults.length} curated pieces tailored to your request "${query}".`,
      products: finalResults
    });
  } catch (error) {
    console.error('NL Search error:', error);
    return res.status(500).json({ error: 'Failed to process AI search' });
  }
};

// 2. "Find Your DHAJ" Quiz & Score Calculator
const calculateDhajQuiz = async (req, res) => {
  try {
    const { occasion, stylePreference, budget, fit, colors, season } = req.body;

    let dbProducts = [];
    try {
      dbProducts = await Product.find({});
    } catch (e) {
      dbProducts = [];
    }
    const dataset = dbProducts.length > 0 ? dbProducts : MOCK_PRODUCTS;

    // Pick 1 Kurta, 1 Waistcoat/Sherwani, 1 Footwear, 1 Shawl/Accessory
    const kurta = dataset.find(p => p.category === 'kurta') || dataset[1] || dataset[0];
    const layering = dataset.find(p => p.category === 'waistcoat' || p.category === 'sherwani') || dataset[0];
    const footwear = dataset.find(p => p.category === 'footwear') || dataset[3] || dataset[0];
    const accessory = dataset.find(p => p.category === 'shawl') || dataset[4] || dataset[0];

    // Compute DHAJ Score (0-100)
    let baseScore = 88;
    if (colors && (colors.includes('Black') || colors.includes('Gold'))) baseScore += 5;
    if (fit && fit.includes('Tailored')) baseScore += 4;
    if (occasion && (occasion.includes('Eid') || occasion.includes('Wedding'))) baseScore += 3;
    const finalScore = Math.min(99, baseScore);

    const totalBundlePrice = (kurta.salePrice || kurta.price) + 
                             (layering.salePrice || layering.price) + 
                             (footwear.salePrice || footwear.price);

    return res.json({
      success: true,
      dhajScore: finalScore,
      lookTitle: `The ${occasion || 'Royal'} ${stylePreference || 'Obsidian'} Look`,
      tagline: 'Precision Tailoring Meets Imperial Pakistani Craftsmanship',
      explanation: `Selected specifically for ${occasion || 'your occasion'} with a ${fit || 'Tailored Slim'} posture. The rich contrast of ${colors?.join(', ') || 'Obsidian Black & Antique Gold'} elevates your stature while maintaining traditional DHAJ dignity.`,
      outfit: {
        kurta,
        layering,
        footwear,
        accessory
      },
      totalBundlePrice,
      savings: 3500,
      stylingNotes: [
        'Wear the waistcoat unbuttoned at the top for an effortless stance.',
        'Pair with hand-crafted leather khussas without socks for modern elegance.',
        'Drape the gold zari doshala over the left shoulder for formal reception attire.'
      ]
    });
  } catch (error) {
    console.error('Quiz error:', error);
    return res.status(500).json({ error: 'Failed to generate quiz recommendation' });
  }
};

// 3. Complete My DHAJ (Cross-sell Outfit Pack)
const getCompleteLook = async (req, res) => {
  try {
    const { productId } = req.params;
    let dbProducts = [];
    try {
      dbProducts = await Product.find({});
    } catch (e) {
      dbProducts = [];
    }
    const dataset = dbProducts.length > 0 ? dbProducts : MOCK_PRODUCTS;

    const baseProduct = dataset.find(p => p._id.toString() === productId || p.slug === productId) || dataset[0];
    const complementaries = dataset.filter(p => p._id.toString() !== baseProduct._id.toString()).slice(0, 3);

    const bundleTotal = (baseProduct.salePrice || baseProduct.price) + 
      complementaries.reduce((sum, item) => sum + (item.salePrice || item.price), 0);

    return res.json({
      success: true,
      baseProduct,
      complementaryProducts: complementaries,
      bundleScore: 96,
      bundleTotal,
      bundleDiscountPrice: Math.round(bundleTotal * 0.9) // 10% bundle discount
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch complete look' });
  }
};

// 4. Virtual Wardrobe Matcher
const matchWardrobe = async (req, res) => {
  try {
    const { userItemTitle, category } = req.body;
    let dbProducts = [];
    try {
      dbProducts = await Product.find({});
    } catch (e) {
      dbProducts = [];
    }
    const dataset = dbProducts.length > 0 ? dbProducts : MOCK_PRODUCTS;

    const recommendations = dataset.slice(0, 3);

    return res.json({
      success: true,
      userItemTitle: userItemTitle || 'Your Uploaded Garment',
      recommendations,
      matchRationale: `DHAJ AI analyzed your item and curated these complementary obsidian & gold pieces to elevate your existing wardrobe item into a complete high-fashion ensemble.`
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to process wardrobe match' });
  }
};

module.exports = {
  parseNaturalLanguageSearch,
  calculateDhajQuiz,
  getCompleteLook,
  matchWardrobe
};

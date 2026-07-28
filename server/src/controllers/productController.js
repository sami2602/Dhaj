const Product = require('../models/Product');

const MOCK_PRODUCTS = [
  {
    _id: 'p1',
    name: 'Royal Obsidian Velvet Waistcoat',
    slug: 'royal-obsidian-velvet-waistcoat',
    subtitle: 'Hand-embroidered Gold Antique Tilla',
    description: 'Masterfully crafted obsidian velvet waistcoat embellished with antique gold tilla motifs inspired by Mughal architecture.',
    details: [
      'Micro velvet fabric with satin interior lining',
      'Handcrafted gold tilla embroidered collar and chest panel',
      'Custom gold filigree DHAJ buttons',
      'Tailored slim posture fit',
      'Dry clean only'
    ],
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
    details: [
      '100% Pure Raw Silk',
      'Minimalist concealed button placket with gold stitching',
      'Includes matching slim churidar trousers',
      'Side pockets with hidden zip security'
    ],
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
    details: [
      'Custom woven Zari Jacquard Silk',
      'Handcrafted pearl and dabka embellishments',
      'Fully canvassed internal structure for regal posture',
      'Includes inner kurta, trousers, and custom hanger case'
    ],
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
    details: [
      '100% Genuine Bovine Leather',
      'Double cushioned orthopedic insole',
      'Pure brass gold metallic thread hand embroidery'
    ],
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
    details: [
      '80% Kashmiri Wool, 20% Silk Pashmina',
      '2.5 meter length with self fringe finish',
      'Intricate antique gold metallic weave'
    ],
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
    details: [
      'Italian High-Density Micro Velvet',
      'Bespoke gold coin cuff buttons',
      'Asymmetric overlap front silhouette',
      'Includes tailored flat-front trousers'
    ],
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

const getProducts = async (req, res) => {
  try {
    const { category, collection, newArrivals, bestSellers, sale, search, sort, minPrice, maxPrice } = req.query;
    
    let products = [];
    try {
      products = await Product.find({});
    } catch (e) {
      products = [];
    }

    if (!products || products.length === 0) {
      products = [...MOCK_PRODUCTS];
    }

    // Filters
    let result = products;
    if (category) {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (collection) {
      result = result.filter(p => p.collectionName.toLowerCase().includes(collection.toLowerCase()));
    }
    if (newArrivals === 'true') {
      result = result.filter(p => p.isNewArrival);
    }
    if (bestSellers === 'true') {
      result = result.filter(p => p.isBestSeller);
    }
    if (sale === 'true') {
      result = result.filter(p => p.isOnSale || p.salePrice);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (minPrice) {
      result = result.filter(p => (p.salePrice || p.price) >= parseInt(minPrice, 10));
    }
    if (maxPrice) {
      result = result.filter(p => (p.salePrice || p.price) <= parseInt(maxPrice, 10));
    }

    // Sort
    if (sort === 'price-low') {
      result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sort === 'price-high') {
      result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return res.json({
      success: true,
      count: result.length,
      products: result
    });
  } catch (error) {
    console.error('getProducts error:', error);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let products = [];
    try {
      products = await Product.find({});
    } catch (e) {
      products = [];
    }

    if (!products || products.length === 0) {
      products = MOCK_PRODUCTS;
    }

    const product = products.find(p => p.slug === slug || p._id.toString() === slug);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.json({
      success: true,
      product
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch product details' });
  }
};

module.exports = {
  getProducts,
  getProductBySlug
};

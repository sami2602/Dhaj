import React, { useState, useEffect } from 'react';

// Components
import DhajLoader from './components/DhajLoader';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AISearchModal from './components/AISearchModal';
import AIChatDrawer from './components/AIChatDrawer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Collections from './pages/Collections';
import Lookbook from './pages/Lookbook';
import AIStylist from './pages/AIStylist';
import StyleQuiz from './pages/StyleQuiz';
import OutfitBuilder from './pages/OutfitBuilder';
import VirtualWardrobe from './pages/VirtualWardrobe';
import WishlistPage from './pages/WishlistPage';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import UserProfile from './pages/UserProfile';
import OrdersPage from './pages/OrdersPage';
import AdminDashboard from './pages/AdminDashboard';
import { NewArrivals, BestSellers, Sale, Category } from './pages/CatalogViews';
import { Login, Register } from './pages/AuthPages';
import { About, Contact, SearchPage, NotFound } from './pages/InformationalPages';

// ─── Embedded Mock Product Catalog ───────────────────────────────────────────
// Used as the primary data source on Vercel (no backend required).
const MOCK_PRODUCTS = [
  {
    _id: 'p1',
    name: 'Royal Obsidian Velvet Waistcoat',
    slug: 'royal-obsidian-velvet-waistcoat',
    subtitle: 'Hand-embroidered Gold Antique Tilla',
    description:
      'Masterfully crafted obsidian velvet waistcoat embellished with antique gold tilla motifs inspired by Mughal architecture.',
    details: [
      'Micro velvet fabric with satin interior lining',
      'Handcrafted gold tilla embroidered collar and chest panel',
      'Custom gold filigree DHAJ buttons',
      'Tailored slim posture fit',
      'Dry clean only',
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
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [
      { name: 'Deep Black', hex: '#0B0B0C' },
      { name: 'Antique Gold Accent', hex: '#D4AF37' },
    ],
    sizes: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 8 },
      { size: 'XL', stock: 4 },
    ],
    fabric: 'Micro Velvet',
    craftsmanship: 'Hand Zardozi & Gold Metallic Thread',
    fit: 'Tailored Slim Fit',
    occasions: ['Eid', 'Wedding', 'Mehndi', 'Valima', 'Formal Evening'],
    season: 'Autumn/Winter',
    rating: 4.9,
    reviewsCount: 42,
  },
  {
    _id: 'p2',
    name: 'Sovereign Raw Silk Kurta Suite',
    slug: 'sovereign-raw-silk-kurta-suite',
    subtitle: 'Classic Cut Raw Silk Kurta & Churidar',
    description:
      'Elevated raw silk black kurta paired with matching slim-fit trousers. Designed for the modern Pakistani gentleman who demands effortless elegance.',
    details: [
      '100% Pure Raw Silk',
      'Minimalist concealed button placket with gold stitching',
      'Includes matching slim churidar trousers',
      'Side pockets with hidden zip security',
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
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0A0A0B' },
      { name: 'Midnight Charcoal', hex: '#1C1C21' },
    ],
    sizes: [
      { size: 'S', stock: 8 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 6 },
    ],
    fabric: 'Pure Raw Silk 80g',
    craftsmanship: 'Minimalist Stitched Concealed Placket',
    fit: 'Modern Relaxed Fit',
    occasions: ['Eid', 'Jummah', 'Mehndi', 'Casual Festive'],
    season: 'All Season',
    rating: 4.8,
    reviewsCount: 36,
  },
  {
    _id: 'p3',
    name: 'Emperor Gold Zari Sherwani',
    slug: 'emperor-gold-zari-sherwani',
    subtitle: 'Imperial Groom Sherwani with Pearl Detailing',
    description:
      'An iconic regal sherwani fashioned from custom textured jacquard silk featuring metallic gold zari weaving and handcrafted pearl button accents.',
    details: [
      'Custom woven Zari Jacquard Silk',
      'Handcrafted pearl and dabka embellishments',
      'Fully canvassed internal structure for regal posture',
      'Includes inner kurta, trousers, and custom hanger case',
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
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [
      { name: 'Antique Gold', hex: '#C5A059' },
      { name: 'Ivory Cream', hex: '#FFFDD0' },
    ],
    sizes: [
      { size: 'S', stock: 2 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 4 },
      { size: 'XL', stock: 2 },
    ],
    fabric: 'Jacquard Silk & Organza Overlay',
    craftsmanship: 'Hand Dabka, Zardozi & South Sea Pearl buttons',
    fit: 'Imperial Structured Fit',
    occasions: ['Groom', 'Wedding', 'Valima'],
    season: 'All Season',
    rating: 5.0,
    reviewsCount: 19,
  },
  {
    _id: 'p4',
    name: 'Nawab Handcrafted Leather Khussa',
    slug: 'nawab-handcrafted-leather-khussa',
    subtitle: 'Gold Metallic Embroidery on Pure Leather',
    description:
      'Handmade double-cushioned genuine leather footwear with intricate dabka embroidery across the toe cap.',
    details: [
      '100% Genuine Bovine Leather',
      'Double cushioned orthopedic insole',
      'Pure brass gold metallic thread hand embroidery',
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
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [
      { name: 'Burnished Gold', hex: '#DAA520' },
      { name: 'Pitch Black', hex: '#000000' },
    ],
    sizes: [
      { size: '40', stock: 6 },
      { size: '41', stock: 10 },
      { size: '42', stock: 12 },
      { size: '43', stock: 8 },
      { size: '44', stock: 4 },
    ],
    fabric: '100% Genuine Bovine Leather',
    craftsmanship: 'Hand-stitched Sole with Memory Foam Cushion',
    fit: 'True to Size',
    occasions: ['Eid', 'Wedding', 'Mehndi', 'Valima'],
    season: 'All Season',
    rating: 4.9,
    reviewsCount: 51,
  },
  {
    _id: 'p5',
    name: 'Pashmina Gold Border Shawl',
    slug: 'pashmina-gold-border-shawl',
    subtitle: 'Heritage Weave Soft Wool Doshala',
    description:
      'Supple Kashmir wool doshala shawl edged with woven antique gold zari border. The ultimate statement accessory for cool evenings.',
    details: [
      '80% Kashmiri Wool, 20% Silk Pashmina',
      '2.5 meter length with self fringe finish',
      'Intricate antique gold metallic weave',
    ],
    price: 12500,
    salePrice: null,
    category: 'shawl',
    collectionName: 'Modern Minimalist',
    isNewArrival: true,
    isBestSeller: false,
    isOnSale: false,
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [{ name: 'Obsidian & Gold', hex: '#111115' }],
    sizes: [{ size: 'Free Size', stock: 15 }],
    fabric: 'Fine Wool Pashmina Blend',
    craftsmanship: 'Handloom Jacquard Weave',
    fit: 'Draped Standard',
    occasions: ['Formal Evening', 'Winter Wedding', 'Valima'],
    season: 'Winter',
    rating: 4.8,
    reviewsCount: 14,
  },
  {
    _id: 'p6',
    name: 'Mirza Cut Velvet Prince Suit',
    slug: 'mirza-cut-velvet-prince-suit',
    subtitle: 'Modern Asymmetric Tuxedo Jacket with Trousers',
    description:
      'Contemporary double-breasted Prince Coat constructed from jet-black Italian micro velvet with understated gold lapel piping.',
    details: [
      'Italian High-Density Micro Velvet',
      'Bespoke gold coin cuff buttons',
      'Asymmetric overlap front silhouette',
      'Includes tailored flat-front trousers',
    ],
    price: 32000,
    salePrice: 28500,
    category: 'prince-suit',
    collectionName: 'Modern Minimalist',
    isNewArrival: true,
    isBestSeller: true,
    isOnSale: true,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [{ name: 'Deep Jet Black', hex: '#050505' }],
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 6 },
      { size: 'XL', stock: 3 },
    ],
    fabric: 'Italian Micro Velvet & Silk Satin Lining',
    craftsmanship: 'Sartorial Canvassed Shoulder Construction',
    fit: 'Slim Sculpted Fit',
    occasions: ['Valima', 'Reception', 'Black Tie', 'Formal Evening'],
    season: 'Autumn/Winter',
    rating: 5.0,
    reviewsCount: 22,
  },
  {
    _id: 'p7',
    name: 'Regal Bundi Waistcoat',
    slug: 'regal-bundi-waistcoat',
    subtitle: 'Short-cut Silk Bundi with Gold Piping',
    description:
      'A traditional short-style bundi waistcoat in midnight silk with contrast gold trim and antique coin buttons.',
    details: [
      'Pure Silk with Gold Piping Trim',
      'Antique coin-style buttons',
      'Fully lined with ivory charmeuse',
    ],
    price: 11500,
    salePrice: null,
    category: 'waistcoat',
    collectionName: 'Modern Minimalist',
    isNewArrival: true,
    isBestSeller: false,
    isOnSale: false,
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [{ name: 'Midnight Navy', hex: '#0D1B2A' }],
    sizes: [
      { size: 'S', stock: 6 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 7 },
    ],
    fabric: 'Pure Silk',
    craftsmanship: 'Machine-finished with Hand Piping',
    fit: 'Regular Fit',
    occasions: ['Eid', 'Mehndi', 'Formal Evening'],
    season: 'All Season',
    rating: 4.7,
    reviewsCount: 18,
  },
  {
    _id: 'p8',
    name: 'Heritage Embroidered Kurta',
    slug: 'heritage-embroidered-kurta',
    subtitle: 'Chest & Collar Hand-Block Embroidery',
    description:
      'Off-white fine lawn kurta featuring hand-block printed floral motifs across the chest and collar — a timeless classic for summer festive wear.',
    details: [
      'Fine Lawn 100-count cotton',
      'Hand-block printed with natural dyes',
      'Grandad collar with pearl button placket',
    ],
    price: 9500,
    salePrice: 8000,
    category: 'kurta',
    collectionName: 'Heritage Craft',
    isNewArrival: false,
    isBestSeller: true,
    isOnSale: true,
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1000',
    ],
    colors: [
      { name: 'Off-White', hex: '#FAF9F6' },
      { name: 'Sage Green', hex: '#8FA67A' },
    ],
    sizes: [
      { size: 'S', stock: 12 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 8 },
    ],
    fabric: 'Fine Lawn Cotton',
    craftsmanship: 'Hand-Block Print & Embroidery',
    fit: 'Loose Relaxed Fit',
    occasions: ['Eid', 'Jummah', 'Casual Festive'],
    season: 'Spring/Summer',
    rating: 4.6,
    reviewsCount: 34,
  },
];

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(MOCK_PRODUCTS[0]);
  const [lastOrder, setLastOrder] = useState(null);

  // Products are always available from MOCK_PRODUCTS immediately.
  // If a real API URL is configured, it will be attempted and can override these.
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) return; // No backend configured → use mock data, skip fetch

    const fetchProducts = async () => {
      try {
        const { default: axios } = await import('axios');
        const res = await axios.get(`${apiUrl}/products`);
        if (res.data.success && res.data.products?.length > 0) {
          setProducts(res.data.products);
          setSelectedProduct(res.data.products[0]);
        }
      } catch {
        // API unreachable → keep MOCK_PRODUCTS (already set as default)
      }
    };

    fetchProducts();
  }, []);

  // Render main page based on state
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} setSelectedProduct={setSelectedProduct} products={products} />;
      case 'shop':
        return <Shop setActivePage={setActivePage} setSelectedProduct={setSelectedProduct} products={products} />;
      case 'category':
        return <Category setActivePage={setActivePage} setSelectedProduct={setSelectedProduct} products={products} />;
      case 'product-details':
        return <ProductDetails product={selectedProduct || products[0]} setActivePage={setActivePage} products={products} />;
      case 'collections':
      case 'collection-details':
        return <Collections setActivePage={setActivePage} />;
      case 'new-arrivals':
        return <NewArrivals setActivePage={setActivePage} setSelectedProduct={setSelectedProduct} products={products} />;
      case 'best-sellers':
        return <BestSellers setActivePage={setActivePage} setSelectedProduct={setSelectedProduct} products={products} />;
      case 'sale':
        return <Sale setActivePage={setActivePage} setSelectedProduct={setSelectedProduct} products={products} />;
      case 'lookbook':
        return <Lookbook setActivePage={setActivePage} setSelectedProduct={setSelectedProduct} products={products} />;
      case 'ai-stylist':
        return <AIStylist setActivePage={setActivePage} />;
      case 'style-quiz':
        return <StyleQuiz setActivePage={setActivePage} products={products} />;
      case 'outfit-builder':
        return <OutfitBuilder products={products} />;
      case 'virtual-wardrobe':
        return <VirtualWardrobe products={products} />;
      case 'wishlist':
        return <WishlistPage setActivePage={setActivePage} setSelectedProduct={setSelectedProduct} />;
      case 'checkout':
        return <Checkout setActivePage={setActivePage} setLastOrder={setLastOrder} />;
      case 'order-success':
        return <OrderSuccess lastOrder={lastOrder} setActivePage={setActivePage} />;
      case 'login':
        return <Login setActivePage={setActivePage} />;
      case 'register':
        return <Register setActivePage={setActivePage} />;
      case 'profile':
        return <UserProfile setActivePage={setActivePage} />;
      case 'orders':
        return <OrdersPage setActivePage={setActivePage} lastOrder={lastOrder} />;
      case 'search':
        return <SearchPage setActivePage={setActivePage} setSelectedProduct={setSelectedProduct} products={products} />;
      case 'about':
        return <About setActivePage={setActivePage} />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return <AdminDashboard products={products} />;
      default:
        return <NotFound setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050506] text-[#F9F9FB] flex flex-col justify-between selection:bg-[#D4AF37] selection:text-black">
      {/* Initial Premium DHAJ Loader Animation */}
      <DhajLoader />

      {/* Global Header Navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area */}
      <main className="flex-1">{renderPage()}</main>

      {/* Slide-over Drawers & Modals */}
      <CartDrawer setActivePage={setActivePage} />
      <AISearchModal setActivePage={setActivePage} setSelectedProduct={setSelectedProduct} products={products} />
      <AIChatDrawer setActivePage={setActivePage} />

      {/* Mobile Floating FAB & Navigation Bar */}
      <MobileNav activePage={activePage} setActivePage={setActivePage} />

      {/* Global Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

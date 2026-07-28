import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch initial products from backend or fallback dataset
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        if (res.data.success && res.data.products?.length > 0) {
          setProducts(res.data.products);
          setSelectedProduct(res.data.products[0]);
        }
      } catch (err) {
        console.log('Backend sync offline, using local fallback products');
      } finally {
        setLoadingProducts(false);
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
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Slide-over Drawers & Modals */}
      <CartDrawer setActivePage={setActivePage} />
      <AISearchModal setActivePage={setActivePage} setSelectedProduct={setSelectedProduct} />
      <AIChatDrawer setActivePage={setActivePage} />

      {/* Mobile Floating FAB & Navigation Bar */}
      <MobileNav activePage={activePage} setActivePage={setActivePage} />

      {/* Global Footer */}
      <Footer setActivePage={setActivePage} />

    </div>
  );
}

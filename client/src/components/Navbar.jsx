import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, Sparkles, Menu, X, Shield } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useAIStore } from '../store/aiStore';

export default function Navbar({ activePage, setActivePage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const openCart = useCartStore((state) => state.openCart);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const openSearch = useAIStore((state) => state.openSearch);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'collections', label: 'Collections' },
    { id: 'new-arrivals', label: 'New Arrivals' },
    { id: 'lookbook', label: 'Lookbook' },
    { id: 'ai-stylist', label: 'DHAJ AI', isAi: true }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-[#050506]/92 backdrop-blur-xl border-b border-[#D4AF37]/25 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' : 'bg-gradient-to-b from-[#050506]/95 via-[#050506]/60 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Mobile menu toggle button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-stone-300 hover:text-[#D4AF37] p-1.5 cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>

        {/* Brand Logo */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setActivePage('home')}
          className="flex items-center gap-3.5 group text-left cursor-pointer"
        >
          <img
            src="/dhaj_logo.png"
            alt="DHAJ Logo"
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all duration-300"
          />
          <div className="hidden sm:block">
            <span className="block font-serif text-lg tracking-[0.25em] text-white font-bold group-hover:text-[#D4AF37] transition-colors">
              DHAJ
            </span>
            <span className="block text-[9px] tracking-[0.22em] text-[#D4AF37] uppercase font-semibold">
              APNI DHAJ. APNA ANDAAZ.
            </span>
          </div>
        </motion.button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-9">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`relative text-xs tracking-[0.22em] uppercase font-semibold transition-colors py-1.5 cursor-pointer ${
                activePage === link.id ? 'text-[#D4AF37]' : 'text-stone-300 hover:text-white'
              }`}
            >
              {link.isAi ? (
                <span className="inline-flex items-center gap-1.5 text-[#D4AF37]">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  {link.label}
                </span>
              ) : (
                link.label
              )}
              {activePage === link.id && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] rounded-full shadow-[0_0_12px_#D4AF37]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Actions Bar */}
        <div className="flex items-center space-x-3.5 sm:space-x-5">
          {/* AI Search */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={openSearch}
            className="text-stone-300 hover:text-[#D4AF37] transition-colors p-2 relative group cursor-pointer"
            title="Natural Language AI Search"
          >
            <Search className="w-5 h-5" />
            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-[10px] bg-black/90 border border-[#D4AF37]/40 text-[#D4AF37] px-2.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
              AI Search
            </span>
          </motion.button>

          {/* Wishlist */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActivePage('wishlist')}
            className="text-stone-300 hover:text-[#D4AF37] transition-colors p-2 relative cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#D4AF37] text-black text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-md"
              >
                {wishlistCount}
              </motion.span>
            )}
          </motion.button>

          {/* Cart Drawer Trigger */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={openCart}
            className="text-stone-300 hover:text-[#D4AF37] transition-colors p-2 relative cursor-pointer"
            title="Your DHAJ Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0.5 right-0.5 w-4.5 h-4.5 bg-[#D4AF37] text-black text-[10px] font-extrabold rounded-full flex items-center justify-center animate-pulse shadow-md"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>

          {/* User Profile / Auth */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActivePage('profile')}
            className="text-stone-300 hover:text-[#D4AF37] transition-colors p-2 cursor-pointer"
            title="Patron Profile"
          >
            <User className="w-5 h-5" />
          </motion.button>

          {/* Admin Dashboard shortcut */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePage('admin')}
            className="hidden md:flex items-center gap-1.5 text-[10px] tracking-wider uppercase border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-3.5 py-1.5 rounded-lg transition-all cursor-pointer bg-[#0A0A0E]/60 shadow-md"
            title="Admin Dashboard"
          >
            <Shield className="w-3.5 h-3.5" />
            Admin
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="lg:hidden bg-[#0A0A0E]/95 backdrop-blur-xl border-b border-[#D4AF37]/30 px-6 py-6 space-y-4 overflow-hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left font-serif text-sm tracking-widest uppercase py-2.5 border-b border-white/5 cursor-pointer ${
                  activePage === link.id ? 'text-[#D4AF37] font-bold' : 'text-stone-300'
                }`}
              >
                {link.isAi ? `✨ ${link.label}` : link.label}
              </button>
            ))}
            <div className="pt-3 flex justify-between items-center text-xs text-stone-400">
              <button onClick={() => { setActivePage('admin'); setMobileMenuOpen(false); }} className="text-[#D4AF37] font-semibold cursor-pointer">
                Admin Portal
              </button>
              <button onClick={() => { setActivePage('about'); setMobileMenuOpen(false); }} className="cursor-pointer hover:text-white">
                Our Story
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

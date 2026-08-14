import React, { useState, useEffect } from 'react';
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
  const openStylist = useAIStore((state) => state.openStylist);

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#050506]/90 backdrop-blur-md border-b border-[#D4AF37]/20 py-3 shadow-2xl' : 'bg-gradient-to-b from-[#050506] via-[#050506]/70 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Mobile menu toggle button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-stone-300 hover:text-[#D4AF37] p-1"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <button
          onClick={() => setActivePage('home')}
          className="flex items-center gap-3 group text-left"
        >
          <img
            src="src/assets/dhaj_logo.png"
            alt="DHAJ Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <div className="hidden sm:block">
            <span className="block font-serif text-lg tracking-[0.25em] text-white font-bold group-hover:text-[#D4AF37] transition-colors">
              DHAJ
            </span>
            <span className="block text-[9px] tracking-[0.2em] text-[#D4AF37] uppercase">
              APNI DHAJ. APNA ANDAAZ.
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`relative text-xs tracking-[0.2em] uppercase font-medium transition-colors py-1 ${
                activePage === link.id ? 'text-[#D4AF37]' : 'text-stone-300 hover:text-white'
              }`}
            >
              {link.isAi && (
                <span className="inline-flex items-center gap-1 text-[#D4AF37]">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  {link.label}
                </span>
              )}
              {!link.isAi && link.label}
              {activePage === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]" />
              )}
            </button>
          ))}
        </nav>

        {/* Actions Bar */}
        <div className="flex items-center space-x-4 sm:space-x-5">
          {/* AI Search */}
          <button
            onClick={openSearch}
            className="text-stone-300 hover:text-[#D4AF37] transition-colors p-2 relative group"
            title="Natural Language AI Search"
          >
            <Search className="w-5 h-5" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-black border border-[#D4AF37]/30 text-[#D4AF37] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              AI Search
            </span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setActivePage('wishlist')}
            className="text-stone-300 hover:text-[#D4AF37] transition-colors p-2 relative"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={openCart}
            className="text-stone-300 hover:text-[#D4AF37] transition-colors p-2 relative"
            title="Your DHAJ Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4.5 h-4.5 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth */}
          <button
            onClick={() => setActivePage('profile')}
            className="text-stone-300 hover:text-[#D4AF37] transition-colors p-2"
            title="Patron Profile"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Admin Dashboard shortcut */}
          <button
            onClick={() => setActivePage('admin')}
            className="hidden md:flex items-center gap-1.5 text-[10px] tracking-wider uppercase border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-3 py-1.5 rounded transition-all"
            title="Admin Dashboard"
          >
            <Shield className="w-3.5 h-3.5" />
            Admin
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0E] border-b border-[#D4AF37]/20 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActivePage(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left font-serif text-sm tracking-widest uppercase py-2 border-b border-white/5 ${
                activePage === link.id ? 'text-[#D4AF37]' : 'text-stone-300'
              }`}
            >
              {link.isAi ? `✨ ${link.label}` : link.label}
            </button>
          ))}
          <div className="pt-2 flex justify-between items-center text-xs text-stone-400">
            <button onClick={() => { setActivePage('admin'); setMobileMenuOpen(false); }} className="text-[#D4AF37]">
              Admin Portal
            </button>
            <button onClick={() => { setActivePage('about'); setMobileMenuOpen(false); }}>
              Our Story
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

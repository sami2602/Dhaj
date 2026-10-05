import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, ShoppingBag, Heart, Eye, Sparkles, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';

export default function Shop({ setActivePage, setSelectedProduct, products }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(70000);
  const [sortBy, setSortBy] = useState('default');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  let filtered = [...(products || [])];

  if (selectedCategory !== 'all') {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  filtered = filtered.filter(p => (p.salePrice || p.price) <= maxPrice);

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const categories = [
    { id: 'all', label: 'All Menswear' },
    { id: 'kurta', label: 'Festive Kurtas' },
    { id: 'waistcoat', label: 'Luxury Waistcoats' },
    { id: 'sherwani', label: 'Royal Sherwanis' },
    { id: 'prince-suit', label: 'Prince Suits' },
    { id: 'shawl', label: 'Heritage Shawls' },
    { id: 'footwear', label: 'Handcrafted Khussas' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-stone-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">The Complete Catalog</span>
          <h1 className="text-3xl font-serif text-white tracking-wider uppercase mt-1">DHAJ Menswear Shop</h1>
        </div>
        <span className="text-xs text-stone-400 font-mono">
          Showing {filtered.length} Masterpiece Garments
        </span>
      </motion.div>

      {/* Filter & Sort Control Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[#0E0E12]/90 border border-stone-800/90 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 glass-obsidian"
      >
        
        {/* Category Pills with Layout Animation */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative text-xs px-4 py-2 rounded-full font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-[#15151C] text-stone-300 hover:text-white border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Price Slider & Sort */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2.5 text-xs text-stone-300">
            <span>Max Budget:</span>
            <input
              type="range"
              min="5000"
              max="70000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-[#D4AF37] w-28 cursor-pointer"
            />
            <span className="text-[#D4AF37] font-bold">PKR {maxPrice.toLocaleString()}</span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#15151C] border border-stone-800 text-xs text-stone-300 rounded-lg px-3.5 py-2 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            <option value="default">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>

      </motion.div>

      {/* Product Grid with Framer Motion AnimatePresence */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filtered.map((product, idx) => (
            <motion.div
              layout
              key={product._id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="bg-[#0E0E12] border border-stone-800/90 rounded-xl overflow-hidden group hover:border-[#D4AF37]/70 transition-all shadow-xl flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-black">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />

                {/* Action Overlays */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => toggleWishlist(product)}
                    className={`p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                      isInWishlist(product._id) ? 'bg-[#D4AF37] text-black shadow-md' : 'bg-black/60 text-white hover:text-[#D4AF37]'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setQuickViewProduct(product)}
                    className="p-2.5 rounded-full bg-black/60 text-white hover:text-[#D4AF37] backdrop-blur-md transition-colors cursor-pointer"
                    title="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                </div>

                {product.isOnSale && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-[#D4AF37] to-[#AA8825] text-black text-[9px] font-extrabold tracking-wider px-2.5 py-1 rounded-sm uppercase shadow-md">
                    Sale Drop
                  </span>
                )}
              </div>

              {/* Product Meta */}
              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-semibold block">
                    {product.collectionName}
                  </span>
                  <h3
                    onClick={() => {
                      setSelectedProduct(product);
                      setActivePage('product-details');
                    }}
                    className="font-serif text-sm text-white font-bold tracking-wide hover:text-[#D4AF37] cursor-pointer mt-1 transition-colors"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">
                    {product.subtitle || product.fabric}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-white block">
                      PKR {(product.salePrice || product.price).toLocaleString()}
                    </span>
                    {product.salePrice && (
                      <span className="text-[10px] text-stone-500 line-through">
                        PKR {product.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                    className="shimmer-button bg-[#D4AF37] text-black hover:bg-[#AA8825] font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Add
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0A0A0E] border border-[#D4AF37]/50 rounded-2xl p-6 max-w-xl w-full text-white relative space-y-4 shadow-[0_0_50px_rgba(212,175,55,0.25)]"
            >
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full border border-stone-800 hover:border-[#D4AF37] transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <img src={quickViewProduct.images[0]} alt={quickViewProduct.name} className="rounded-xl object-cover h-64 w-full shadow-lg" />
                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest block font-serif font-semibold">Quick View</span>
                    <h3 className="font-serif text-lg font-bold mt-1">{quickViewProduct.name}</h3>
                    <p className="text-xs text-stone-300 leading-relaxed mt-2">{quickViewProduct.description}</p>
                  </div>
                  <div className="space-y-3 pt-2">
                    <div className="text-lg font-bold text-[#D4AF37]">
                      PKR {(quickViewProduct.salePrice || quickViewProduct.price).toLocaleString()}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        addToCart(quickViewProduct);
                        setQuickViewProduct(null);
                      }}
                      className="w-full shimmer-button bg-[#D4AF37] text-black font-bold text-xs py-3 rounded-lg uppercase hover:bg-[#AA8825] transition-colors cursor-pointer shadow-lg"
                    >
                      Add Garment to Cart
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

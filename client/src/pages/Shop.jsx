import React, { useState } from 'react';
import { Filter, SlidersHorizontal, ShoppingBag, Heart, Eye, Sparkles } from 'lucide-react';
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
      <div className="border-b border-stone-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">The Complete Catalog</span>
          <h1 className="text-3xl font-serif text-white tracking-wider uppercase mt-1">DHAJ Menswear Shop</h1>
        </div>
        <span className="text-xs text-stone-400 font-mono">
          Showing {filtered.length} Masterpiece Garments
        </span>
      </div>

      {/* Filter & Sort Control Bar */}
      <div className="bg-[#0E0E12] border border-stone-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                  : 'bg-[#15151C] text-stone-300 hover:text-white border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Price Slider & Sort */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs text-stone-300">
            <span>Max Budget:</span>
            <input
              type="range"
              min="5000"
              max="70000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-[#D4AF37] w-24 cursor-pointer"
            />
            <span className="text-[#D4AF37] font-bold">PKR {maxPrice.toLocaleString()}</span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#15151C] border border-stone-800 text-xs text-stone-300 rounded px-3 py-1.5 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="default">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div
            key={product._id}
            className="bg-[#0E0E12] border border-stone-800 rounded-lg overflow-hidden group hover:border-[#D4AF37]/60 transition-all shadow-xl flex flex-col justify-between"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-black">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Action Overlays */}
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                    isInWishlist(product._id) ? 'bg-[#D4AF37] text-black' : 'bg-black/60 text-white hover:text-[#D4AF37]'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="p-2 rounded-full bg-black/60 text-white hover:text-[#D4AF37] backdrop-blur-md transition-colors"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {product.isOnSale && (
                <span className="absolute top-3 left-3 bg-[#D4AF37] text-black text-[9px] font-bold tracking-wider px-2 py-0.5 rounded uppercase">
                  Sale Drop
                </span>
              )}
            </div>

            {/* Product Meta */}
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-semibold block">
                  {product.collectionName}
                </span>
                <h3
                  onClick={() => {
                    setSelectedProduct(product);
                    setActivePage('product-details');
                  }}
                  className="font-serif text-sm text-white font-bold tracking-wide hover:text-[#D4AF37] cursor-pointer mt-1"
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
                <button
                  onClick={() => addToCart(product)}
                  className="bg-[#D4AF37] text-black hover:bg-[#AA8825] font-bold text-xs px-4 py-2 rounded transition-colors flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0A0E] border border-[#D4AF37]/40 rounded-xl p-6 max-w-xl w-full text-white relative space-y-4">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <img src={quickViewProduct.images[0]} alt={quickViewProduct.name} className="rounded object-cover h-64 w-full" />
              <div className="space-y-3">
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest block font-serif">Quick View</span>
                <h3 className="font-serif text-lg font-bold">{quickViewProduct.name}</h3>
                <p className="text-xs text-stone-300 leading-relaxed">{quickViewProduct.description}</p>
                <div className="text-base font-bold text-[#D4AF37]">
                  PKR {(quickViewProduct.salePrice || quickViewProduct.price).toLocaleString()}
                </div>
                <button
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="w-full bg-[#D4AF37] text-black font-bold text-xs py-3 rounded uppercase hover:bg-[#AA8825]"
                >
                  Add Garment to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

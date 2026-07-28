import React, { useState } from 'react';
import { Star, ShieldCheck, Heart, ShoppingBag, Sparkles, Check, ArrowRight, Truck } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';

export default function ProductDetails({ product, setActivePage, products }) {
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]?.size || 'M');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || 'Obsidian Black');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const addCompleteOutfitToCart = useCartStore((state) => state.addCompleteOutfitToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="pt-32 text-center text-white font-serif">
        Product not found. <button onClick={() => setActivePage('shop')} className="text-[#D4AF37] underline">Return to Shop</button>
      </div>
    );
  }

  // Related products for Complete My DHAJ
  const related = products?.filter(p => p._id !== product._id).slice(0, 2) || [];
  const fullOutfitPack = [product, ...related];
  const outfitTotalPrice = fullOutfitPack.reduce((sum, item) => sum + (item.salePrice || item.price), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-16">
      
      {/* Top Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] bg-black rounded-xl overflow-hidden border border-stone-800 shadow-2xl">
            <img
              src={selectedImage || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-colors ${
                isInWishlist(product._id) ? 'bg-[#D4AF37] text-black' : 'bg-black/60 text-white hover:text-[#D4AF37]'
              }`}
            >
              <Heart className="w-5 h-5 fill-current" />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-24 rounded overflow-hidden border transition-all ${
                    selectedImage === img ? 'border-[#D4AF37] shadow-[0_0_10px_#D4AF37]' : 'border-stone-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="space-y-6 text-white">
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-serif font-bold">
                {product.collectionName}
              </span>
              <span className="text-stone-600">•</span>
              <span className="text-[10px] text-emerald-400 font-mono">DHAJ Match Score: 98/100</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-wide uppercase mt-1">
              {product.name}
            </h1>
            <p className="text-xs text-stone-400 mt-1">{product.subtitle}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-2xl font-bold text-[#D4AF37]">
              PKR {(product.salePrice || product.price).toLocaleString()}
            </span>
            {product.salePrice && (
              <span className="text-sm text-stone-500 line-through">
                PKR {product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <div className="flex text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>{product.rating} ({product.reviewsCount} Patron Reviews)</span>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed pt-2 border-t border-stone-800">
            {product.description}
          </p>

          {/* Details Bullet Points */}
          {product.details && (
            <ul className="space-y-1.5 text-xs text-stone-400">
              {product.details.map((d, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> {d}
                </li>
              ))}
            </ul>
          )}

          {/* Color Selection */}
          {product.colors?.length > 0 && (
            <div className="space-y-2 pt-2">
              <label className="text-xs font-serif text-stone-300 uppercase tracking-widest block">
                Color Choice: <strong className="text-[#D4AF37]">{selectedColor}</strong>
              </label>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs transition-all ${
                      selectedColor === c.name ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white' : 'border-stone-800 text-stone-400'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-serif text-stone-300 uppercase tracking-widest">
                Posture Size: <strong className="text-[#D4AF37]">{selectedSize}</strong>
              </label>
              <button
                onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                className="text-[#D4AF37] hover:underline"
              >
                AI Size Guide
              </button>
            </div>

            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-12 h-10 rounded border text-xs font-bold transition-all ${
                    selectedSize === s ? 'border-[#D4AF37] bg-[#D4AF37] text-black shadow-[0_0_10px_#D4AF37]' : 'border-stone-800 text-stone-300 hover:border-stone-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add To Cart CTA */}
          <div className="pt-4 flex gap-4">
            <button
              onClick={() => addToCart(product, selectedSize, selectedColor)}
              className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#AA8825] text-black font-bold text-xs tracking-[0.2em] py-4 rounded uppercase shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Add Garment to Cart
            </button>
          </div>

          {/* Value Prop Badges */}
          <div className="pt-4 grid grid-cols-2 gap-4 text-[11px] text-stone-400 border-t border-stone-800">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#D4AF37]" /> Express Delivery in 48-72 Hours
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Hand Embroidered Authenticity Guarantee
            </div>
          </div>

        </div>

      </div>

      {/* COMPLETE MY DHAJ - OUTFIT BUNDLE PACK */}
      <div className="bg-[#0E0E14] border border-[#D4AF37]/30 rounded-xl p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-800 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">
                Complete The DHAJ Look
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white uppercase font-bold tracking-wide mt-1">
              Curated Imperial Outfit Bundle
            </h2>
          </div>
          <button
            onClick={() => addCompleteOutfitToCart(fullOutfitPack)}
            className="bg-[#D4AF37] text-black font-bold text-xs px-6 py-3 rounded uppercase hover:bg-[#AA8825] transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          >
            Add Entire Outfit Bundle (PKR {outfitTotalPrice.toLocaleString()}) <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {fullOutfitPack.map((item, idx) => (
            <div key={idx} className="bg-[#14141C] p-3 rounded border border-stone-800 flex gap-3 items-center">
              <img src={item.images[0]} alt={item.name} className="w-16 h-20 object-cover rounded border border-stone-800" />
              <div>
                <span className="text-[9px] text-[#D4AF37] uppercase tracking-wider block">Piece #{idx+1}</span>
                <h4 className="font-serif text-xs text-white font-bold truncate">{item.name}</h4>
                <p className="text-[11px] text-[#D4AF37] font-semibold mt-1">
                  PKR {(item.salePrice || item.price).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

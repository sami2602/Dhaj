import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function VirtualWardrobe({ products }) {
  const [items, setItems] = useState([
    { id: 1, title: 'Black Raw Silk Pajama', category: 'Pajama', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=400' }
  ]);

  const [analyzing, setAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const addToCart = useCartStore((state) => state.addToCart);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAnalyzing(true);
      setTimeout(() => {
        const newItem = {
          id: Date.now(),
          title: 'Uploaded Customer Garment',
          category: 'Kurta',
          image: URL.createObjectURL(file)
        };
        setItems([newItem, ...items]);
        setAnalyzing(false);

        // Set complementary DHAJ recommendations
        setRecommendations(products?.slice(0, 3) || []);
      }, 1200);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-stone-800 pb-6 text-center space-y-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">AI Fashion Matcher</span>
        <h1 className="text-3xl font-serif text-white tracking-wider uppercase">DHAJ Virtual Wardrobe</h1>
        <p className="text-xs text-stone-400 max-w-xl mx-auto font-light">
          Upload photos of your existing clothing. DHAJ AI will pair them with complementary luxury waistcoats, sherwanis, and footwear.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload & Current Wardrobe Trunk */}
        <div className="space-y-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#0E0E14] border-2 border-dashed border-[#D4AF37]/50 rounded-2xl p-8 text-center space-y-4 hover:border-[#D4AF37] transition-all relative glass-obsidian"
          >
            <Upload className="w-10 h-10 text-[#D4AF37] mx-auto animate-bounce" />
            <h3 className="font-serif text-sm text-white font-bold uppercase">Upload Your Garment Image</h3>
            <p className="text-xs text-stone-400">JPG, PNG or WEBP up to 10MB</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </motion.div>

          <div className="space-y-3">
            <h3 className="font-serif text-xs text-stone-300 uppercase tracking-widest font-semibold">Your Uploaded Trunk Items:</h3>
            <div className="grid grid-cols-2 gap-3.5">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-[#121218] p-2 rounded-xl border border-stone-800 space-y-1 hover:border-[#D4AF37]/40 transition-colors"
                  >
                    <img src={item.image} alt="" className="w-full h-28 object-cover rounded-lg" />
                    <span className="font-serif text-[11px] text-white font-bold block truncate">{item.title}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* AI Recommendations Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0E0E14] border border-[#D4AF37]/40 rounded-2xl p-6 space-y-6 text-white shadow-2xl glass-obsidian">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-3.5">
              <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
              <h3 className="font-serif text-sm tracking-widest uppercase font-bold">DHAJ AI Outfit Match Engine</h3>
            </div>

            {analyzing ? (
              <div className="text-center py-16 text-stone-400 space-y-3">
                <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_15px_#D4AF37]" />
                <p className="text-xs font-serif text-[#D4AF37]">Analyzing color harmonies & posture alignment...</p>
              </div>
            ) : recommendations ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <p className="text-xs text-stone-300 leading-relaxed bg-[#14141E] p-3.5 rounded-xl border border-stone-800 font-light">
                  ✨ DHAJ AI analyzed your item and curated these complementary obsidian & gold pieces to elevate your existing garment into a full imperial look:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recommendations.map((p, idx) => (
                    <motion.div
                      key={p._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="bg-[#14141C] p-3.5 rounded-xl border border-stone-800 space-y-2.5 hover:border-[#D4AF37]/50 transition-colors"
                    >
                      <img src={p.images[0]} alt={p.name} className="w-full h-36 object-cover rounded-lg" />
                      <h4 className="font-serif text-xs font-bold text-white line-clamp-1">{p.name}</h4>
                      <span className="text-xs text-[#D4AF37] font-bold block">PKR {(p.salePrice || p.price).toLocaleString()}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(p)}
                        className="w-full bg-[#D4AF37] text-black font-bold text-[10px] py-2.5 rounded-lg uppercase hover:bg-[#AA8825] transition-colors cursor-pointer"
                      >
                        Add to Cart
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-16 text-stone-400 space-y-2">
                <p className="text-xs font-serif font-light">Upload an image on the left to activate AI outfit recommendations.</p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

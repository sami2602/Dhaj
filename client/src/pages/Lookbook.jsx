import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Sparkles, ShoppingBag, Eye, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function Lookbook({ setActivePage, setSelectedProduct, products }) {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  const lookbookLooks = [
    {
      id: 1,
      title: 'The Sovereign Groom Look',
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=1200',
      product: products?.[2] || products?.[0]
    },
    {
      id: 2,
      title: 'Obsidian Velvet Gala Attire',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
      product: products?.[0]
    },
    {
      id: 3,
      title: 'Raw Silk Festive Ensemble',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1200',
      product: products?.[1]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-stone-800 pb-6 text-center space-y-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">Interactive Editorial</span>
        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-wider uppercase">DHAJ Interactive Lookbook</h1>
        <p className="text-xs text-stone-400 max-w-xl mx-auto font-light">
          Click the glowing golden tags on each lookbook frame to instantly view and shop the exact garments worn by our models.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {lookbookLooks.map((look, idx) => (
          <motion.div
            key={look.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            whileHover={{ y: -6 }}
            className="bg-[#0E0E12] border border-stone-800/90 rounded-2xl overflow-hidden shadow-2xl relative group hover:border-[#D4AF37]/60 transition-all"
          >
            
            {/* Image Frame */}
            <div className="relative h-[460px] bg-black overflow-hidden">
              <img
                src={look.image}
                alt={look.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-transparent to-transparent opacity-80" />

              {/* Glowing Interactive Hotspot Tag */}
              <motion.button
                animate={{ scale: [1, 1.25, 1], boxShadow: ['0 0 15px #D4AF37', '0 0 30px #D4AF37', '0 0 15px #D4AF37'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                onClick={() => setActiveHotspot(look.product)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#D4AF37] text-black flex items-center justify-center cursor-pointer font-bold"
                title="Click to Shop Look"
              >
                <Tag className="w-4.5 h-4.5" />
              </motion.button>
            </div>

            {/* Look Details */}
            <div className="p-6 space-y-3">
              <span className="text-[10px] text-[#D4AF37] font-serif uppercase tracking-widest block font-semibold">Lookbook Look #{look.id}</span>
              <h3 className="font-serif text-lg font-bold text-white uppercase">{look.title}</h3>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  if (look.product) {
                    setSelectedProduct(look.product);
                    setActivePage('product-details');
                  }
                }}
                className="w-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black py-2.5 rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer"
              >
                Shop Worn Garments
              </motion.button>
            </div>

          </motion.div>
        ))}
      </div>

      {/* Hotspot Modal */}
      <AnimatePresence>
        {activeHotspot && (
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
              className="bg-[#0A0A0E] border border-[#D4AF37]/60 rounded-2xl p-6 max-w-md w-full text-white relative space-y-4 shadow-[0_0_50px_rgba(212,175,55,0.3)] glass-obsidian"
            >
              <button
                onClick={() => setActiveHotspot(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full border border-stone-800 hover:border-[#D4AF37] transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex gap-4 items-center">
                <img src={activeHotspot.images[0]} alt={activeHotspot.name} className="w-24 h-32 object-cover rounded-xl border border-stone-800 shadow-md" />
                <div className="space-y-2.5 flex-1">
                  <span className="text-[9px] text-[#D4AF37] uppercase tracking-widest block font-semibold">Hotspot Tagged Garment</span>
                  <h4 className="font-serif text-sm font-bold">{activeHotspot.name}</h4>
                  <div className="text-sm font-bold text-[#D4AF37]">PKR {(activeHotspot.salePrice || activeHotspot.price).toLocaleString()}</div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      addToCart(activeHotspot);
                      setActiveHotspot(null);
                    }}
                    className="shimmer-button bg-[#D4AF37] text-black font-bold text-xs px-4 py-2.5 rounded-lg uppercase hover:bg-[#AA8825] flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

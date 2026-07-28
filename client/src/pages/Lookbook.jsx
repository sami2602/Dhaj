import React, { useState } from 'react';
import { Tag, Sparkles, ShoppingBag, Eye } from 'lucide-react';
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
      <div className="border-b border-stone-800 pb-6 text-center">
        <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">Interactive Editorial</span>
        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-wider uppercase mt-1">DHAJ Interactive Lookbook</h1>
        <p className="text-xs text-stone-400 mt-1 max-w-xl mx-auto">
          Click the glowing golden tags on each lookbook frame to instantly view and shop the exact garments worn by our models.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {lookbookLooks.map((look) => (
          <div key={look.id} className="bg-[#0E0E12] border border-stone-800 rounded-xl overflow-hidden shadow-2xl relative group">
            
            {/* Image Frame */}
            <div className="relative h-[450px] bg-black">
              <img src={look.image} alt={look.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-transparent to-transparent" />

              {/* Hotspot Button */}
              <button
                onClick={() => setActiveHotspot(look.product)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-[0_0_20px_#D4AF37] animate-pulse hover:scale-125 transition-transform"
                title="Click to Shop Look"
              >
                <Tag className="w-4 h-4" />
              </button>
            </div>

            {/* Look Details */}
            <div className="p-6 space-y-3">
              <span className="text-[10px] text-[#D4AF37] font-serif uppercase tracking-widest block">Lookbook Look #{look.id}</span>
              <h3 className="font-serif text-lg font-bold text-white uppercase">{look.title}</h3>
              <button
                onClick={() => {
                  if (look.product) {
                    setSelectedProduct(look.product);
                    setActivePage('product-details');
                  }
                }}
                className="w-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black py-2.5 rounded text-xs font-bold uppercase transition-colors"
              >
                Shop Worn Garments
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Hotspot Modal */}
      {activeHotspot && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0A0E] border border-[#D4AF37] rounded-xl p-6 max-w-md w-full text-white relative space-y-4 shadow-2xl">
            <button onClick={() => setActiveHotspot(null)} className="absolute top-4 right-4 text-stone-400 hover:text-white">✕</button>
            <div className="flex gap-4">
              <img src={activeHotspot.images[0]} alt={activeHotspot.name} className="w-24 h-32 object-cover rounded border border-stone-800" />
              <div className="space-y-2">
                <span className="text-[9px] text-[#D4AF37] uppercase tracking-widest block">Hotspot Tagged Garment</span>
                <h4 className="font-serif text-sm font-bold">{activeHotspot.name}</h4>
                <div className="text-sm font-bold text-[#D4AF37]">PKR {(activeHotspot.salePrice || activeHotspot.price).toLocaleString()}</div>
                <button
                  onClick={() => {
                    addToCart(activeHotspot);
                    setActiveHotspot(null);
                  }}
                  className="bg-[#D4AF37] text-black font-bold text-xs px-4 py-2 rounded uppercase hover:bg-[#AA8825] flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

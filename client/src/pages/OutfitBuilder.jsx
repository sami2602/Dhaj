import React, { useState } from 'react';
import { Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function OutfitBuilder({ products }) {
  const dataset = products || [];

  const kurtas = dataset.filter(p => p.category === 'kurta');
  const waistcoats = dataset.filter(p => p.category === 'waistcoat' || p.category === 'sherwani' || p.category === 'prince-suit');
  const footwears = dataset.filter(p => p.category === 'footwear');
  const shawls = dataset.filter(p => p.category === 'shawl');

  const [selectedKurta, setSelectedKurta] = useState(kurtas[0] || dataset[1]);
  const [selectedWaistcoat, setSelectedWaistcoat] = useState(waistcoats[0] || dataset[0]);
  const [selectedFootwear, setSelectedFootwear] = useState(footwears[0] || dataset[3]);

  const addCompleteOutfitToCart = useCartStore((state) => state.addCompleteOutfitToCart);

  const outfitList = [selectedKurta, selectedWaistcoat, selectedFootwear].filter(Boolean);
  const totalPrice = outfitList.reduce((sum, item) => sum + (item.salePrice || item.price), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
      <div className="border-b border-stone-800 pb-6 text-center">
        <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">Interactive Studio</span>
        <h1 className="text-3xl font-serif text-white tracking-wider uppercase mt-1">DHAJ Outfit Builder</h1>
        <p className="text-xs text-stone-400 mt-1">Mix and match base kurtas, outer waistcoats, and handcrafted footwear in real-time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Selection Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Kurta Picker */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm text-[#D4AF37] uppercase tracking-widest">1. Select Base Kurta:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {kurtas.map((k) => (
                <div
                  key={k._id}
                  onClick={() => setSelectedKurta(k)}
                  className={`p-2.5 rounded-lg border bg-[#0E0E12] cursor-pointer transition-all ${
                    selectedKurta?._id === k._id ? 'border-[#D4AF37] shadow-[0_0_12px_#D4AF37]' : 'border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <img src={k.images[0]} alt={k.name} className="w-full h-32 object-cover rounded" />
                  <h4 className="font-serif text-xs text-white font-bold truncate mt-2">{k.name}</h4>
                  <span className="text-[11px] text-[#D4AF37] font-semibold">PKR {(k.salePrice || k.price).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Outer Layer Picker */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm text-[#D4AF37] uppercase tracking-widest">2. Select Waistcoat / Sherwani:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {waistcoats.map((w) => (
                <div
                  key={w._id}
                  onClick={() => setSelectedWaistcoat(w)}
                  className={`p-2.5 rounded-lg border bg-[#0E0E12] cursor-pointer transition-all ${
                    selectedWaistcoat?._id === w._id ? 'border-[#D4AF37] shadow-[0_0_12px_#D4AF37]' : 'border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <img src={w.images[0]} alt={w.name} className="w-full h-32 object-cover rounded" />
                  <h4 className="font-serif text-xs text-white font-bold truncate mt-2">{w.name}</h4>
                  <span className="text-[11px] text-[#D4AF37] font-semibold">PKR {(w.salePrice || w.price).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Footwear Picker */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm text-[#D4AF37] uppercase tracking-widest">3. Select Handcrafted Footwear:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {footwears.map((f) => (
                <div
                  key={f._id}
                  onClick={() => setSelectedFootwear(f)}
                  className={`p-2.5 rounded-lg border bg-[#0E0E12] cursor-pointer transition-all ${
                    selectedFootwear?._id === f._id ? 'border-[#D4AF37] shadow-[0_0_12px_#D4AF37]' : 'border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <img src={f.images[0]} alt={f.name} className="w-full h-32 object-cover rounded" />
                  <h4 className="font-serif text-xs text-white font-bold truncate mt-2">{f.name}</h4>
                  <span className="text-[11px] text-[#D4AF37] font-semibold">PKR {(f.salePrice || f.price).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Live Outfit Preview Card */}
        <div className="bg-[#0E0E14] border border-[#D4AF37]/30 rounded-xl p-6 space-y-6 shadow-2xl sticky top-28 self-start text-white">
          <div className="flex justify-between items-center border-b border-stone-800 pb-3">
            <span className="font-serif text-xs text-[#D4AF37] uppercase tracking-widest font-bold">Outfit Preview</span>
            <span className="text-xs text-emerald-400 font-mono">DHAJ Score: 97/100</span>
          </div>

          <div className="space-y-3">
            {outfitList.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#14141C] p-2 rounded border border-stone-800">
                <img src={item.images[0]} alt={item.name} className="w-12 h-14 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-xs font-bold text-white truncate">{item.name}</h4>
                  <span className="text-[10px] text-stone-400 capitalize">{item.category}</span>
                  <span className="text-xs text-[#D4AF37] font-bold block">PKR {(item.salePrice || item.price).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-800 space-y-3">
            <div className="flex justify-between font-serif text-sm font-bold">
              <span>Total Ensemble Price:</span>
              <span className="text-[#D4AF37]">PKR {totalPrice.toLocaleString()}</span>
            </div>

            <button
              onClick={() => addCompleteOutfitToCart(outfitList)}
              className="w-full bg-[#D4AF37] text-black font-bold text-xs tracking-widest py-3.5 rounded uppercase hover:bg-[#AA8825] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <ShoppingBag className="w-4 h-4" /> Add Ensemble to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

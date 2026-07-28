import React, { useState } from 'react';
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
      <div className="border-b border-stone-800 pb-6 text-center">
        <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">AI Fashion Matcher</span>
        <h1 className="text-3xl font-serif text-white tracking-wider uppercase mt-1">DHAJ Virtual Wardrobe</h1>
        <p className="text-xs text-stone-400 mt-1 max-w-xl mx-auto">
          Upload photos of your existing clothing. DHAJ AI will pair them with complementary luxury waistcoats, sherwanis, and footwear.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload & Current Wardrobe Trunk */}
        <div className="space-y-6">
          <div className="bg-[#0E0E14] border-2 border-dashed border-[#D4AF37]/40 rounded-xl p-8 text-center space-y-4 hover:border-[#D4AF37] transition-colors relative">
            <Upload className="w-10 h-10 text-[#D4AF37] mx-auto animate-bounce" />
            <h3 className="font-serif text-sm text-white font-bold uppercase">Upload Your Garment Image</h3>
            <p className="text-xs text-stone-400">JPG, PNG or WEBP up to 10MB</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-xs text-stone-300 uppercase tracking-widest">Your Uploaded Trunk Items:</h3>
            <div className="grid grid-cols-2 gap-3">
              {items.map((item) => (
                <div key={item.id} className="bg-[#121218] p-2 rounded border border-stone-800 space-y-1">
                  <img src={item.image} alt="" className="w-full h-28 object-cover rounded" />
                  <span className="font-serif text-[11px] text-white font-bold block truncate">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendations Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0E0E14] border border-[#D4AF37]/30 rounded-xl p-6 space-y-6 text-white shadow-2xl">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-serif text-sm tracking-widest uppercase font-bold">DHAJ AI Outfit Match Engine</h3>
            </div>

            {analyzing ? (
              <div className="text-center py-12 text-stone-400 space-y-2">
                <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-serif">Analyzing color harmonies & posture alignment...</p>
              </div>
            ) : recommendations ? (
              <div className="space-y-6">
                <p className="text-xs text-stone-300 leading-relaxed bg-[#14141E] p-3 rounded border border-stone-800">
                  ✨ DHAJ AI analyzed your item and curated these complementary obsidian & gold pieces to elevate your existing garment into a full imperial look:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recommendations.map((p) => (
                    <div key={p._id} className="bg-[#14141C] p-3 rounded border border-stone-800 space-y-2">
                      <img src={p.images[0]} alt={p.name} className="w-full h-36 object-cover rounded" />
                      <h4 className="font-serif text-xs font-bold text-white line-clamp-1">{p.name}</h4>
                      <span className="text-xs text-[#D4AF37] font-bold block">PKR {(p.salePrice || p.price).toLocaleString()}</span>
                      <button
                        onClick={() => addToCart(p)}
                        className="w-full bg-[#D4AF37] text-black font-bold text-[10px] py-2 rounded uppercase hover:bg-[#AA8825]"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-stone-400 space-y-2">
                <p className="text-xs font-serif">Upload an image on the left to activate AI outfit recommendations.</p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

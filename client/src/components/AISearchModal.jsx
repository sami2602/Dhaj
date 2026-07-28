import React, { useState } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { useAIStore } from '../store/aiStore';
import axios from 'axios';

export default function AISearchModal({ setActivePage, setSelectedProduct }) {
  const { isSearchOpen, closeSearch } = useAIStore();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  if (!isSearchOpen) return null;

  const samplePrompts = [
    'Black embroidered kurta for Eid under 15000',
    'Royal obsidian velvet waistcoat for Groom',
    'Gold Zari Sherwani under 60000',
    'Modern Prince coat for formal reception',
    'Handmade khussa for wedding'
  ];

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/search', { query });
      if (res.data.success) {
        setResults(res.data);
      }
    } catch (err) {
      console.log('Search fallback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="bg-[#0A0A0E] border border-[#D4AF37]/30 w-full max-w-2xl rounded-xl p-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={closeSearch}
          className="absolute top-4 right-4 text-stone-400 hover:text-[#D4AF37] p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="font-serif text-base tracking-widest text-white uppercase">DHAJ Smart AI Fashion Search</h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSearchSubmit} className="relative mb-6">
          <input
            type="text"
            placeholder="e.g. 'Black embroidered kurta for Eid under 15000'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#14141A] border border-stone-800 focus:border-[#D4AF37] text-sm text-white px-4 py-3.5 pl-11 rounded-lg focus:outline-none"
            autoFocus
          />
          <Search className="w-5 h-5 absolute left-3.5 top-4 text-stone-400" />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-[#D4AF37] text-black px-4 rounded text-xs font-bold uppercase hover:bg-[#AA8825] transition-colors"
          >
            {loading ? 'Analyzing...' : 'Search'}
          </button>
        </form>

        {/* Sample Prompts */}
        {!results && (
          <div>
            <span className="text-[11px] text-stone-400 uppercase tracking-widest block mb-2 font-serif">
              Suggested Fashion Prompts:
            </span>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(prompt)}
                  className="bg-[#121216] hover:border-[#D4AF37] border border-stone-800 text-xs text-stone-300 px-3 py-1.5 rounded-full transition-colors"
                >
                  ✨ {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="mt-6 space-y-4">
            <div className="bg-[#121218] p-3 rounded border border-[#D4AF37]/20 text-xs text-stone-300">
              <span className="text-[#D4AF37] font-semibold block mb-1">DHAJ AI Intent Breakdown:</span>
              <p>{results.aiSummary}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-72 overflow-y-auto pr-1">
              {results.products?.map((p) => (
                <div
                  key={p._id}
                  onClick={() => {
                    setSelectedProduct(p);
                    setActivePage('product-details');
                    closeSearch();
                  }}
                  className="flex gap-3 bg-[#111116] p-2.5 rounded border border-stone-800 hover:border-[#D4AF37] cursor-pointer transition-colors"
                >
                  <img src={p.images[0]} alt={p.name} className="w-16 h-20 object-cover rounded" />
                  <div>
                    <h4 className="font-serif text-xs text-white font-medium">{p.name}</h4>
                    <p className="text-[11px] text-[#D4AF37] font-bold mt-1">
                      PKR {(p.salePrice || p.price).toLocaleString()}
                    </p>
                    <span className="text-[10px] text-stone-400 capitalize">{p.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

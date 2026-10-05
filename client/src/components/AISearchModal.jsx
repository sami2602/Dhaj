import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles } from 'lucide-react';
import { useAIStore } from '../store/aiStore';

export default function AISearchModal({ setActivePage, setSelectedProduct, products = [] }) {
  const { isSearchOpen, closeSearch } = useAIStore();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const samplePrompts = [
    'Black embroidered kurta for Eid under 15000',
    'Royal obsidian velvet waistcoat for Groom',
    'Gold Zari Sherwani under 60000',
    'Modern Prince coat for formal reception',
    'Handmade khussa for wedding',
  ];

  // Local AI parser (works without any backend)
  const parseAndSearch = (q) => {
    const lower = q.toLowerCase();

    // Extract max price
    let maxPrice = null;
    const priceMatch =
      lower.match(/(?:under|below|less than|max)\s*(?:rs\.?|pkr)?\s*(\d+)/i) ||
      lower.match(/(\d+)\s*(?:k|thousand)/i);
    if (priceMatch) {
      maxPrice =
        lower.includes('k') || lower.includes('thousand')
          ? parseInt(priceMatch[1], 10) * 1000
          : parseInt(priceMatch[1], 10);
    }

    // Extract category
    let category = null;
    if (lower.includes('kurta')) category = 'kurta';
    else if (lower.includes('waistcoat') || lower.includes('bundi')) category = 'waistcoat';
    else if (lower.includes('sherwani')) category = 'sherwani';
    else if (lower.includes('prince') || lower.includes('suit')) category = 'prince-suit';
    else if (lower.includes('khussa') || lower.includes('shoe') || lower.includes('footwear')) category = 'footwear';
    else if (lower.includes('shawl') || lower.includes('doshala')) category = 'shawl';

    // Extract occasion
    let occasion = null;
    if (lower.includes('eid')) occasion = 'Eid';
    else if (lower.includes('wedding') || lower.includes('shaadi')) occasion = 'Wedding';
    else if (lower.includes('mehndi')) occasion = 'Mehndi';
    else if (lower.includes('valima')) occasion = 'Valima';
    else if (lower.includes('groom')) occasion = 'Groom';
    else if (lower.includes('formal') || lower.includes('reception')) occasion = 'Formal Evening';

    // Filter products
    let filtered = [...products];

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (maxPrice) {
      filtered = filtered.filter((p) => (p.salePrice || p.price) <= maxPrice);
    }
    if (occasion) {
      filtered = filtered.filter((p) =>
        p.occasions?.some((o) => o.toLowerCase().includes(occasion.toLowerCase()))
      );
    }

    const finalResults = filtered.length > 0 ? filtered : products.slice(0, 4);

    return {
      parsedIntent: {
        category: category || 'All Menswear',
        maxPrice: maxPrice ? `PKR ${maxPrice.toLocaleString()}` : 'Any Budget',
        occasion: occasion || 'All Occasions',
        colorDetected: lower.includes('black') ? 'Black' : lower.includes('gold') ? 'Gold' : 'All',
      },
      aiSummary: `DHAJ AI identified ${finalResults.length} curated piece${finalResults.length !== 1 ? 's' : ''} tailored to your request.`,
      products: finalResults,
    };
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const res = parseAndSearch(query);
      setResults(res);
      setLoading(false);
    }, 400);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="bg-[#0A0A0E] border border-[#D4AF37]/40 w-full max-w-2xl rounded-2xl p-6 shadow-[0_0_60px_rgba(212,175,55,0.25)] relative glass-obsidian"
          >
            {/* Close */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => {
                closeSearch();
                setResults(null);
                setQuery('');
              }}
              className="absolute top-4 right-4 text-stone-400 hover:text-[#D4AF37] p-1.5 rounded-full border border-stone-800 hover:border-[#D4AF37] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
              <h3 className="font-serif text-base tracking-widest text-white uppercase font-bold">
                DHAJ Smart AI Fashion Search
              </h3>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative mb-6">
              <input
                type="text"
                placeholder="e.g. 'Black embroidered kurta for Eid under 15000'…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-[#14141A] border border-stone-800 focus:border-[#D4AF37] text-sm text-white px-4 py-3.5 pl-11 pr-24 rounded-xl focus:outline-none shadow-inner"
                autoFocus
              />
              <Search className="w-5 h-5 absolute left-3.5 top-4 text-stone-400" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="absolute right-2 top-2 bottom-2 bg-[#D4AF37] text-black px-4 rounded-lg text-xs font-bold uppercase hover:bg-[#AA8825] transition-colors disabled:opacity-60 cursor-pointer shadow-md"
              >
                {loading ? 'Searching…' : 'Search'}
              </motion.button>
            </form>

            {/* Sample Prompts */}
            {!results && (
              <div>
                <span className="text-[11px] text-stone-400 uppercase tracking-widest block mb-2 font-serif font-semibold">
                  Suggested Fashion Prompts:
                </span>
                <div className="flex flex-wrap gap-2">
                  {samplePrompts.map((prompt, idx) => (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      key={idx}
                      onClick={() => setQuery(prompt)}
                      className="bg-[#121216] hover:border-[#D4AF37] border border-stone-800 text-xs text-stone-300 px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                    >
                      ✨ {prompt}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 space-y-4"
              >
                {/* Intent Breakdown */}
                <div className="bg-[#121218] p-3.5 rounded-xl border border-[#D4AF37]/30 text-xs text-stone-300">
                  <span className="text-[#D4AF37] font-semibold block mb-1">DHAJ AI Intent Breakdown:</span>
                  <p className="font-light">{results.aiSummary}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-stone-400">
                    <span>Category: <strong className="text-white">{results.parsedIntent.category}</strong></span>
                    <span>Max Budget: <strong className="text-white">{results.parsedIntent.maxPrice}</strong></span>
                    <span>Occasion: <strong className="text-white">{results.parsedIntent.occasion}</strong></span>
                  </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-72 overflow-y-auto pr-1">
                  {results.products?.map((p) => (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      key={p._id}
                      onClick={() => {
                        setSelectedProduct(p);
                        setActivePage('product-details');
                        closeSearch();
                        setResults(null);
                        setQuery('');
                      }}
                      className="flex gap-3 bg-[#111116] p-2.5 rounded-xl border border-stone-800 hover:border-[#D4AF37] cursor-pointer transition-all"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-serif text-xs text-white font-medium line-clamp-2">{p.name}</h4>
                        <p className="text-[11px] text-[#D4AF37] font-bold mt-1">
                          PKR {(p.salePrice || p.price).toLocaleString()}
                        </p>
                        <span className="text-[10px] text-stone-400 capitalize">{p.category}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Reset */}
                <button
                  onClick={() => {
                    setResults(null);
                    setQuery('');
                  }}
                  className="text-xs text-stone-500 hover:text-[#D4AF37] underline cursor-pointer"
                >
                  ← New Search
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

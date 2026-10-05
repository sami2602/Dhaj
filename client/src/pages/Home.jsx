import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, ChevronRight, Star, Heart, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Home({ setActivePage, setSelectedProduct, products }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const occasions = [
    { title: 'Eid Festive', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800', category: 'kurta' },
    { title: 'Royal Weddings', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=800', category: 'sherwani' },
    { title: 'Obsidian Velvet Waistcoats', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800', category: 'waistcoat' },
    { title: 'Black Tie Reception', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800', category: 'prince-suit' }
  ];

  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <div className="space-y-24 pb-16">
      
      {/* IMMERSIVE CINEMATIC HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
        
        {/* Background Image / Ambient Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 0.35 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1920"
            alt="DHAJ Menswear Background"
            className="w-full h-full object-cover object-center filter contrast-125 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/75 to-[#050506]/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14)_0%,transparent_70%)]" />
        </div>

        {/* Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-7"
        >
          
          {/* Logo Badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <div className="inline-flex items-center gap-2 bg-[#14141C]/90 border border-[#D4AF37]/50 px-5 py-2 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.25)] backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
              <span className="text-xs font-serif tracking-[0.28em] text-[#D4AF37] uppercase font-semibold">
                The Sovereign Collection 2026
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white tracking-[0.15em] font-extrabold uppercase leading-tight drop-shadow-lg"
          >
            APNI DHAJ. <span className="text-gold-gradient block sm:inline">APNA ANDAAZ.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-stone-300 text-sm sm:text-lg max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
          >
            Modern Pakistani Menswear, Reimagined. Impeccable Raw Silks, Micro Velvet Waistcoats & Bespoke AI Fashion Styling.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActivePage('style-quiz')}
              className="w-full sm:w-auto shimmer-button bg-gradient-to-r from-[#D4AF37] via-[#F5D77D] to-[#AA8825] text-black font-bold tracking-[0.2em] text-xs px-9 py-4 rounded uppercase shadow-[0_0_35px_rgba(212,175,55,0.45)] transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              FIND YOUR DHAJ <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, borderColor: 'rgba(212,175,55,0.8)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActivePage('shop')}
              className="w-full sm:w-auto border border-[#D4AF37]/50 text-white hover:text-[#D4AF37] font-semibold tracking-[0.2em] text-xs px-9 py-4 rounded uppercase backdrop-blur-md transition-all bg-[#0A0A0E]/50 cursor-pointer"
            >
              EXPLORE COLLECTION
            </motion.button>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div variants={itemVariants} className="pt-12 grid grid-cols-3 max-w-lg mx-auto border-t border-white/10 text-center">
            <div className="group">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37] group-hover:scale-110 transition-transform">99.4%</span>
              <span className="text-[10px] text-stone-400 tracking-widest uppercase mt-1 block">Precision Fit</span>
            </div>
            <div className="group">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37] group-hover:scale-110 transition-transform">100%</span>
              <span className="text-[10px] text-stone-400 tracking-widest uppercase mt-1 block">Pure Raw Silk</span>
            </div>
            <div className="group">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37] group-hover:scale-110 transition-transform">0-100</span>
              <span className="text-[10px] text-stone-400 tracking-widest uppercase mt-1 block">AI Style Score</span>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* SHOP BY OCCASION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-800 pb-4"
        >
          <div>
            <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">Sartorial Curation</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wider uppercase mt-1">Shop By Occasion</h2>
          </div>
          <button
            onClick={() => setActivePage('shop')}
            className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 mt-2 sm:mt-0 font-medium group cursor-pointer"
          >
            View All Categories <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setActivePage('shop')}
              className="group relative h-80 rounded-xl overflow-hidden border border-stone-800 hover:border-[#D4AF37] cursor-pointer transition-all shadow-2xl"
            >
              <img
                src={occ.image}
                alt={occ.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] text-[#D4AF37] font-semibold tracking-widest uppercase block mb-1">
                  Collection
                </span>
                <h3 className="font-serif text-lg text-white font-bold tracking-wide group-hover:text-[#D4AF37] transition-colors">
                  {occ.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DHAJ AI FEATURE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0E0E14] via-[#161622] to-[#0A0A0E] border border-[#D4AF37]/40 p-8 sm:p-12 shadow-[0_0_60px_rgba(212,175,55,0.18)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37] px-3.5 py-1.5 rounded-full text-[#D4AF37] text-xs font-semibold">
                <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
                DHAJ Intelligence Engine
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif text-white uppercase font-bold tracking-wide">
                Meet Your AI Fashion Stylist
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                Answer 5 quick style preferences to receive a bespoke 0-100 DHAJ Harmony Score and complete outfit recommendations tailored to your fit, occasion, and budget.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActivePage('style-quiz')}
                  className="shimmer-button bg-[#D4AF37] text-black font-bold tracking-widest text-xs px-7 py-3.5 rounded uppercase hover:bg-[#AA8825] transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  Start "Find Your DHAJ" Quiz <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, borderColor: 'rgba(212,175,55,0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActivePage('virtual-wardrobe')}
                  className="border border-stone-700 text-white hover:text-[#D4AF37] text-xs tracking-widest px-7 py-3.5 rounded uppercase transition-colors cursor-pointer"
                >
                  Virtual Wardrobe Upload
                </motion.button>
              </div>
            </div>

            {/* Visual Card Mockup with Animated Glowing Pulse */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-[#050506]/95 border border-[#D4AF37]/40 rounded-xl p-6 shadow-2xl relative glass-obsidian"
            >
              <div className="flex items-center justify-between border-b border-stone-800 pb-3.5 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-[#D4AF37] animate-ping" />
                  <span className="font-serif text-xs text-white uppercase tracking-wider font-semibold">
                    Calculated DHAJ Score: <span className="text-[#D4AF37]">98/100</span>
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded font-mono font-bold tracking-wider">
                  MATCH HARMONY
                </span>
              </div>
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">Garment Match:</span>
                  <span className="text-white font-medium">Obsidian Velvet Waistcoat</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">Posture Alignment:</span>
                  <span className="text-white font-medium">Tailored V-Taper</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-400">Occasion Score:</span>
                  <span className="text-[#D4AF37] font-bold">100% Royal Wedding</span>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* TRENDING LUXURY OUTFITS / BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-800 pb-4"
        >
          <div>
            <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">Imperial Catalog</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wider uppercase mt-1">Trending Masterpieces</h2>
          </div>
          <button
            onClick={() => setActivePage('shop')}
            className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 mt-2 sm:mt-0 font-medium group cursor-pointer"
          >
            Explore Full Shop <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-[#0E0E12] border border-stone-800/90 rounded-xl overflow-hidden group hover:border-[#D4AF37]/70 transition-all shadow-xl flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-black">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                
                {/* Wishlist Icon */}
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
                    isInWishlist(product._id) ? 'bg-[#D4AF37] text-black shadow-md' : 'bg-black/60 text-white hover:text-[#D4AF37]'
                  }`}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </motion.button>

                {/* Badge */}
                {product.isOnSale && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-[#D4AF37] to-[#AA8825] text-black text-[9px] font-extrabold tracking-wider px-2.5 py-1 rounded-sm uppercase shadow-md">
                    Privilege Drop
                  </span>
                )}
              </div>

              {/* Card Details */}
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
                    className="font-serif text-xs text-white font-bold tracking-wide hover:text-[#D4AF37] cursor-pointer line-clamp-1 mt-1 transition-colors"
                  >
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                    {product.subtitle || product.fabric}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      PKR {(product.salePrice || product.price).toLocaleString()}
                    </span>
                    {product.salePrice && (
                      <span className="text-[10px] text-stone-500 line-through">
                        PKR {product.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addToCart(product)}
                    className="bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black p-2.5 rounded-lg transition-colors cursor-pointer"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY DHAJ - HERITAGE GUARANTEE */}
      <section className="bg-[#0A0A0D]/90 border-y border-stone-800 py-16 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto space-y-2"
          >
            <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">The House of DHAJ</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wider uppercase">Uncompromising Stature</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Pure Handcrafted Tilla',
                desc: 'Every waistcoat and sherwani is hand-embroidered by master artisans in Lahore using authentic gold dabka thread.'
              },
              {
                num: '02',
                title: 'AI Posture Tailoring',
                desc: 'Our proprietary AI recommendations calculate exact sleeve drop and shoulder width according to your physique.'
              },
              {
                num: '03',
                title: 'Concierge Delivery',
                desc: 'Delivered in custom wooden trunk hanger cases with complimentary fitting adjustments across Pakistan.'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className="p-6 bg-[#0E0E12] border border-stone-800/90 rounded-xl space-y-3 shadow-lg hover:border-[#D4AF37]/50 transition-all"
              >
                <div className="w-11 h-11 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mx-auto font-serif font-bold text-sm">
                  {item.num}
                </div>
                <h3 className="font-serif text-sm text-white tracking-widest uppercase">{item.title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

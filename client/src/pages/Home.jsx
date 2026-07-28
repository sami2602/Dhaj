import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, ChevronRight, Star, Heart, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';

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
    <div className="space-y-20 pb-16">
      
      {/* IMMERSIVE CINEMATIC HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        
        {/* Background Image / Ambient Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1920"
            alt="DHAJ Menswear Background"
            className="w-full h-full object-cover object-center opacity-30 filter contrast-125 brightness-75 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/70 to-[#050506]/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_65%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
          
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-2 bg-[#14141C]/80 border border-[#D4AF37]/40 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <span className="text-xs font-serif tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
              The Sovereign Collection 2026
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif text-white tracking-[0.15em] font-extrabold uppercase leading-tight">
            APNI DHAJ. <span className="text-gold-gradient block sm:inline">APNA ANDAAZ.</span>
          </h1>

          {/* Subheading */}
          <p className="text-stone-300 text-sm sm:text-lg max-w-2xl mx-auto font-light tracking-wide">
            Modern Pakistani Menswear, Reimagined. Impeccable Raw Silks, Micro Velvet Waistcoats & Bespoke AI Fashion Styling.
          </p>

          {/* CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActivePage('style-quiz')}
              className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] via-[#F5D77D] to-[#AA8825] text-black font-bold tracking-[0.2em] text-xs px-8 py-4 rounded uppercase shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-2 group"
            >
              FIND YOUR DHAJ <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActivePage('shop')}
              className="w-full sm:w-auto border border-[#D4AF37]/50 text-white hover:text-[#D4AF37] hover:border-[#D4AF37] font-semibold tracking-[0.2em] text-xs px-8 py-4 rounded uppercase backdrop-blur-sm transition-all"
            >
              EXPLORE COLLECTION
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="pt-12 grid grid-cols-3 max-w-lg mx-auto border-t border-white/10 text-center">
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-bold text-[#D4AF37]">99.4%</span>
              <span className="text-[10px] text-stone-400 tracking-widest uppercase">Precision Fit</span>
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-bold text-[#D4AF37]">100%</span>
              <span className="text-[10px] text-stone-400 tracking-widest uppercase">Pure Raw Silk</span>
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-bold text-[#D4AF37]">0-100</span>
              <span className="text-[10px] text-stone-400 tracking-widest uppercase">AI Style Score</span>
            </div>
          </div>

        </div>
      </section>

      {/* SHOP BY OCCASION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-800 pb-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">Sartorial Curation</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wider uppercase mt-1">Shop By Occasion</h2>
          </div>
          <button
            onClick={() => setActivePage('shop')}
            className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 mt-2 sm:mt-0 font-medium"
          >
            View All Categories <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ, idx) => (
            <div
              key={idx}
              onClick={() => setActivePage('shop')}
              className="group relative h-80 rounded-lg overflow-hidden border border-stone-800 hover:border-[#D4AF37] cursor-pointer transition-all shadow-xl"
            >
              <img
                src={occ.image}
                alt={occ.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] text-[#D4AF37] font-semibold tracking-widest uppercase block mb-1">
                  Collection
                </span>
                <h3 className="font-serif text-lg text-white font-bold tracking-wide group-hover:text-[#D4AF37] transition-colors">
                  {occ.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DHAJ AI FEATURE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0E0E14] via-[#161622] to-[#0A0A0E] border border-[#D4AF37]/30 p-8 sm:p-12 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37] px-3 py-1 rounded-full text-[#D4AF37] text-xs font-semibold">
                <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
                DHAJ Intelligence Engine
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif text-white uppercase font-bold tracking-wide">
                Meet Your AI Fashion Stylist
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Answer 5 quick style preferences to receive a bespoke 0-100 DHAJ Harmony Score and complete outfit recommendations tailored to your fit, occasion, and budget.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => setActivePage('style-quiz')}
                  className="bg-[#D4AF37] text-black font-bold tracking-widest text-xs px-6 py-3.5 rounded uppercase hover:bg-[#AA8825] transition-colors flex items-center gap-2"
                >
                  Start "Find Your DHAJ" Quiz <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActivePage('virtual-wardrobe')}
                  className="border border-stone-700 text-white hover:border-[#D4AF37] text-xs tracking-widest px-6 py-3.5 rounded uppercase transition-colors"
                >
                  Virtual Wardrobe Upload
                </button>
              </div>
            </div>

            {/* Visual Card Mockup */}
            <div className="bg-[#050506]/90 border border-[#D4AF37]/30 rounded-xl p-6 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
                  <span className="font-serif text-xs text-white uppercase tracking-wider font-semibold">
                    Calculated DHAJ Score: 98/100
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded font-mono">
                  MATCH HARMONY
                </span>
              </div>
              <div className="space-y-3">
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
            </div>

          </div>
        </div>
      </section>

      {/* TRENDING LUXURY OUT FITS / BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-800 pb-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">Imperial Catalog</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wider uppercase mt-1">Trending Masterpieces</h2>
          </div>
          <button
            onClick={() => setActivePage('shop')}
            className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 mt-2 sm:mt-0 font-medium"
          >
            Explore Full Shop <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
                
                {/* Wishlist Icon */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                    isInWishlist(product._id) ? 'bg-[#D4AF37] text-black' : 'bg-black/60 text-white hover:text-[#D4AF37]'
                  }`}
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>

                {/* Badge */}
                {product.isOnSale && (
                  <span className="absolute top-3 left-3 bg-[#D4AF37] text-black text-[9px] font-bold tracking-wider px-2 py-0.5 rounded uppercase">
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
                    className="font-serif text-xs text-white font-bold tracking-wide hover:text-[#D4AF37] cursor-pointer line-clamp-1 mt-1"
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
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black p-2 rounded transition-colors"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* WHY DHAJ - HERITAGE GUARANTEE */}
      <section className="bg-[#0A0A0D] border-y border-stone-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">The House of DHAJ</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wider uppercase">Uncompromising Stature</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#0E0E12] border border-stone-800/80 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mx-auto font-serif font-bold">
                01
              </div>
              <h3 className="font-serif text-sm text-white tracking-widest uppercase">Pure Handcrafted Tilla</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Every waistcoat and sherwani is hand-embroidered by master artisans in Lahore using authentic gold dabka thread.
              </p>
            </div>

            <div className="p-6 bg-[#0E0E12] border border-stone-800/80 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mx-auto font-serif font-bold">
                02
              </div>
              <h3 className="font-serif text-sm text-white tracking-widest uppercase">AI Posture Tailoring</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Our proprietary AI recommendations calculate exact sleeve drop and shoulder width according to your physique.
              </p>
            </div>

            <div className="p-6 bg-[#0E0E12] border border-stone-800/80 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mx-auto font-serif font-bold">
                03
              </div>
              <h3 className="font-serif text-sm text-white tracking-widest uppercase">Concierge Delivery</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Delivered in custom wooden trunk hanger cases with complimentary fitting adjustments across Pakistan.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

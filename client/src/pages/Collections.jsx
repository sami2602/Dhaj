import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Collections({ setActivePage }) {
  const collections = [
    {
      id: 'royal-heritage',
      title: 'Royal Heritage 2026',
      subtitle: 'Imperious Black Velvet & Antique Gold Tilla',
      description: 'Inspired by Mughal court attire, featuring deep micro velvet waistcoats and raw silk kurtas crafted for momentous celebrations.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'sovereign-velvet',
      title: 'Sovereign Velvet Edition',
      subtitle: 'Heavy Hand Embroidery for Royal Grooms',
      description: 'Intricately embroidered sherwanis featuring authentic South Sea pearls and dabka metallic thread work.',
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'modern-minimalist',
      title: 'Modern Minimalist',
      subtitle: 'Clean Monochrome Lines & Raw Silk Silhouette',
      description: 'Understated luxury for contemporary galas and festive Jummah attire.',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
      <div className="border-b border-stone-800 pb-6 text-center">
        <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">Editorial Releases</span>
        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-wider uppercase mt-1">DHAJ Fashion Collections</h1>
        <p className="text-stone-400 text-xs mt-2 max-w-xl mx-auto">
          Explore our seasonal drops, combining historic Pakistani craftsmanship with modern tailoring principles.
        </p>
      </div>

      <div className="space-y-12">
        {collections.map((c) => (
          <div
            key={c.id}
            onClick={() => setActivePage('shop')}
            className="group relative rounded-xl overflow-hidden border border-stone-800 hover:border-[#D4AF37] cursor-pointer shadow-2xl transition-all"
          >
            <div className="h-[420px] w-full relative overflow-hidden bg-black">
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/40 to-transparent" />
            </div>

            <div className="absolute bottom-8 left-8 right-8 max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[#D4AF37] text-xs font-serif tracking-widest uppercase font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Drop
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl text-white font-bold tracking-wide group-hover:text-[#D4AF37] transition-colors uppercase">
                {c.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 line-clamp-2">
                {c.description}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 bg-[#D4AF37] text-black text-xs font-bold px-5 py-2.5 rounded uppercase tracking-wider group-hover:bg-[#AA8825]">
                  Shop Collection <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

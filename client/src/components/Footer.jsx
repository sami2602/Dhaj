import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function Footer({ setActivePage }) {
  const [currency, setCurrency] = useState('PKR');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#050506] border-t border-[#D4AF37]/20 pt-16 pb-24 lg:pb-12 text-stone-300">
      {/* Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/5 text-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-3">
            <Truck className="w-5 h-5" />
          </div>
          <h4 className="font-serif text-sm text-white tracking-widest uppercase">Express Global Delivery</h4>
          <p className="text-xs text-stone-400 mt-1 max-w-xs">Complimentary nationwide shipping on orders above PKR 15,000</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-serif text-sm text-white tracking-widest uppercase">Imperial Tailoring Guarantee</h4>
          <p className="text-xs text-stone-400 mt-1 max-w-xs">Bespoke fitting adjustments & hand-embroidered authenticity certificate</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-3">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h4 className="font-serif text-sm text-white tracking-widest uppercase">7-Day Concierge Exchange</h4>
          <p className="text-xs text-stone-400 mt-1 max-w-xs">Hassle-free exchange policy with home pickup in major cities</p>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <img src="/dhaj_logo.png" alt="DHAJ Logo" className="w-12 h-12 object-contain" />
            <div>
              <span className="font-serif text-xl tracking-[0.2em] text-white font-bold block">DHAJ</span>
              <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase">APNI DHAJ. APNA ANDAAZ.</span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-stone-400 max-w-sm">
            DHAJ is Pakistan’s premier luxury menswear house, fusing centuries-old royal craftsmanship with modern sartorial tailoring and AI-driven personal styling.
          </p>

          {/* Currency Switcher */}
          <div className="pt-2 flex items-center gap-2">
            <span className="text-xs text-stone-400">Currency:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-[#111116] border border-[#D4AF37]/30 text-xs text-[#D4AF37] rounded px-3 py-1.5 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="PKR">PKR (₨)</option>
              <option value="USD">USD ($)</option>
              <option value="AED">AED (د.إ)</option>
            </select>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-xs text-white tracking-[0.2em] uppercase font-semibold mb-4 text-[#D4AF37]">
            Collections
          </h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setActivePage('category')} className="hover:text-[#D4AF37] transition-colors">Festive Kurtas</button></li>
            <li><button onClick={() => setActivePage('category')} className="hover:text-[#D4AF37] transition-colors">Obsidian Waistcoats</button></li>
            <li><button onClick={() => setActivePage('category')} className="hover:text-[#D4AF37] transition-colors">Royal Groom Sherwanis</button></li>
            <li><button onClick={() => setActivePage('category')} className="hover:text-[#D4AF37] transition-colors">Prince Tuxedo Suits</button></li>
            <li><button onClick={() => setActivePage('category')} className="hover:text-[#D4AF37] transition-colors">Handmade Khussas</button></li>
            <li><button onClick={() => setActivePage('category')} className="hover:text-[#D4AF37] transition-colors">Pashmina Doshala Shawls</button></li>
          </ul>
        </div>

        {/* AI Features */}
        <div>
          <h4 className="font-serif text-xs text-white tracking-[0.2em] uppercase font-semibold mb-4 text-[#D4AF37]">
            DHAJ AI Suite
          </h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setActivePage('style-quiz')} className="hover:text-[#D4AF37] transition-colors">Find Your DHAJ Quiz</button></li>
            <li><button onClick={() => setActivePage('ai-stylist')} className="hover:text-[#D4AF37] transition-colors">AI Stylist Assistant</button></li>
            <li><button onClick={() => setActivePage('outfit-builder')} className="hover:text-[#D4AF37] transition-colors">Interactive Outfit Builder</button></li>
            <li><button onClick={() => setActivePage('virtual-wardrobe')} className="hover:text-[#D4AF37] transition-colors">Virtual Wardrobe Matcher</button></li>
            <li><button onClick={() => setActivePage('lookbook')} className="hover:text-[#D4AF37] transition-colors">Interactive Lookbook</button></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h4 className="font-serif text-xs text-white tracking-[0.2em] uppercase font-semibold mb-4 text-[#D4AF37]">
            The Royal Privilege Club
          </h4>
          <p className="text-xs text-stone-400 mb-3">
            Subscribe for private preview access to limited edition drops & bespoke concierge offers.
          </p>

          {subscribed ? (
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs p-3 rounded text-center">
              Welcome to The DHAJ Circle. Check your inbox for your 10% privilege code.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0E0E12] border border-stone-800 text-xs text-white px-3 py-2.5 rounded focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 bg-[#D4AF37] text-black px-3 rounded flex items-center justify-center hover:bg-[#AA8825] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          <div className="mt-4 pt-4 border-t border-white/5 space-y-1 text-[11px] text-stone-400">
            <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Gulberg III, MM Alam Road, Lahore</div>
            <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> +92 42 111 000 342</div>
            <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> concierge@dhaj.com</div>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
        <div>
          © {new Date().getFullYear()} DHAJ. APNI DHAJ. APNA ANDAAZ. All Rights Reserved.
        </div>
        <div className="flex space-x-6">
          <button onClick={() => setActivePage('about')} className="hover:text-stone-300">Privacy Policy</button>
          <button onClick={() => setActivePage('about')} className="hover:text-stone-300">Terms of Luxury Service</button>
          <button onClick={() => setActivePage('contact')} className="hover:text-stone-300">Contact Concierge</button>
        </div>
      </div>
    </footer>
  );
}

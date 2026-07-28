import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Sparkles, AlertCircle } from 'lucide-react';
import Shop from './Shop';

export function About({ setActivePage }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20 space-y-8 text-white">
      <div className="text-center space-y-3">
        <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">The House of DHAJ</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold uppercase tracking-wide">APNI DHAJ. APNA ANDAAZ.</h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Modern Pakistani Menswear, Reimagined for the Contemporary Gentleman.
        </p>
      </div>

      <div className="bg-[#0E0E14] border border-stone-800 rounded-xl p-8 space-y-6 text-xs text-stone-300 leading-relaxed shadow-2xl">
        <p>
          Founded in Lahore, <strong className="text-[#D4AF37]">DHAJ</strong> represents the pinnacle of Pakistani menswear. Our philosophy merges centuries of imperial Mughal dabka hand-embroidery with precision AI posture recommendations and modern tailored cuts.
        </p>
        <p>
          Each garment is individually crafted from pure raw silk 80g or imported Italian micro velvet, ensuring an unmistakable presence at Eid, royal weddings, and black-tie receptions.
        </p>
        <div className="pt-4 border-t border-stone-800 flex justify-center">
          <button
            onClick={() => setActivePage('shop')}
            className="bg-[#D4AF37] text-black font-bold text-xs px-8 py-3 rounded uppercase hover:bg-[#AA8825]"
          >
            Explore The Collection
          </button>
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20 space-y-8 text-white">
      <div className="border-b border-stone-800 pb-4 text-center">
        <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">Concierge Desk</span>
        <h1 className="text-3xl font-serif tracking-wider uppercase mt-1">Contact DHAJ</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#0E0E14] border border-stone-800 rounded-xl p-6 space-y-4">
          <h3 className="font-serif text-sm text-[#D4AF37] uppercase font-bold">Boutique Atelier Locations</h3>
          <div className="space-y-3 text-xs text-stone-300">
            <div className="flex gap-2"><MapPin className="w-4 h-4 text-[#D4AF37]" /> Gulberg III, MM Alam Road, Lahore</div>
            <div className="flex gap-2"><Phone className="w-4 h-4 text-[#D4AF37]" /> +92 42 111 000 342</div>
            <div className="flex gap-2"><Mail className="w-4 h-4 text-[#D4AF37]" /> concierge@dhaj.com</div>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-[#0E0E14] border border-stone-800 rounded-xl p-6 space-y-3">
          <h3 className="font-serif text-sm text-white uppercase font-bold">Send Message</h3>
          {submitted ? (
            <p className="text-xs text-emerald-400">Thank you. Our concierge will contact you within 2 hours.</p>
          ) : (
            <>
              <input type="text" required placeholder="Your Name" className="w-full bg-[#14141C] border border-stone-800 text-xs p-2.5 rounded text-white focus:border-[#D4AF37]" />
              <input type="email" required placeholder="Your Email" className="w-full bg-[#14141C] border border-stone-800 text-xs p-2.5 rounded text-white focus:border-[#D4AF37]" />
              <textarea required placeholder="Message / Fit Inquiry" rows="3" className="w-full bg-[#14141C] border border-stone-800 text-xs p-2.5 rounded text-white focus:border-[#D4AF37]"></textarea>
              <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold text-xs py-2.5 rounded uppercase hover:bg-[#AA8825]">Submit Message</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export function SearchPage(props) {
  return <Shop {...props} />;
}

export function NotFound({ setActivePage }) {
  return (
    <div className="max-w-md mx-auto px-4 pt-36 pb-20 text-center text-white space-y-6">
      <AlertCircle className="w-16 h-16 text-[#D4AF37] mx-auto animate-bounce" />
      <h1 className="font-serif text-4xl font-extrabold text-[#D4AF37]">404</h1>
      <h2 className="font-serif text-lg uppercase font-bold">Page Not Found</h2>
      <p className="text-xs text-stone-400">The requested sartorial page does not exist in the DHAJ directory.</p>
      <button
        onClick={() => setActivePage('home')}
        className="bg-[#D4AF37] text-black font-bold text-xs px-8 py-3.5 rounded uppercase hover:bg-[#AA8825]"
      >
        Return to Home
      </button>
    </div>
  );
}

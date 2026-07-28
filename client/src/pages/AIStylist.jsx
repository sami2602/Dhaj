import React, { useState } from 'react';
import { Sparkles, MessageSquare, ArrowRight, Bot } from 'lucide-react';
import { useAIStore } from '../store/aiStore';

export default function AIStylist({ setActivePage }) {
  const { openStylist } = useAIStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20 space-y-12 text-white">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37] px-4 py-1.5 rounded-full text-[#D4AF37] text-xs font-semibold">
          <Sparkles className="w-4 h-4 animate-pulse" />
          DHAJ Sartorial AI Assistant
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold uppercase tracking-wide">
          DHAJ AI Fashion Stylist Hub
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Powered by deep Pakistani menswear styling data. Calculate your posture score, discover complementary palette matching, and receive instant outfit recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-[#0E0E14] border border-stone-800 hover:border-[#D4AF37] rounded-xl p-6 space-y-4 shadow-xl text-center">
          <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-base font-bold uppercase">Find Your DHAJ Quiz</h3>
          <p className="text-xs text-stone-400">Answer 6 questions to get your 0-100 score and 1-click full outfit bundle.</p>
          <button
            onClick={() => setActivePage('style-quiz')}
            className="w-full bg-[#D4AF37] text-black font-bold text-xs py-3 rounded uppercase hover:bg-[#AA8825]"
          >
            Launch Quiz
          </button>
        </div>

        <div className="bg-[#0E0E14] border border-stone-800 hover:border-[#D4AF37] rounded-xl p-6 space-y-4 shadow-xl text-center">
          <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-base font-bold uppercase">AI Fashion Chat Assistant</h3>
          <p className="text-xs text-stone-400">Ask natural language questions about Eid, wedding, or fit guidance.</p>
          <button
            onClick={openStylist}
            className="w-full border border-[#D4AF37] text-[#D4AF37] font-bold text-xs py-3 rounded uppercase hover:bg-[#D4AF37] hover:text-black"
          >
            Open Chat Bot
          </button>
        </div>

        <div className="bg-[#0E0E14] border border-stone-800 hover:border-[#D4AF37] rounded-xl p-6 space-y-4 shadow-xl text-center">
          <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-base font-bold uppercase">Virtual Wardrobe Matcher</h3>
          <p className="text-xs text-stone-400">Upload your own garment photos and get matching waistcoats & shoes.</p>
          <button
            onClick={() => setActivePage('virtual-wardrobe')}
            className="w-full border border-stone-700 text-white font-bold text-xs py-3 rounded uppercase hover:border-[#D4AF37]"
          >
            Upload Photos
          </button>
        </div>

      </div>
    </div>
  );
}

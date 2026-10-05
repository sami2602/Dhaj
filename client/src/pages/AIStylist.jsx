import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, ArrowRight, Bot } from 'lucide-react';
import { useAIStore } from '../store/aiStore';

export default function AIStylist({ setActivePage }) {
  const { openStylist } = useAIStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20 space-y-12 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37] px-4 py-1.5 rounded-full text-[#D4AF37] text-xs font-semibold">
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
          DHAJ Sartorial AI Assistant
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold uppercase tracking-wide">
          DHAJ AI Fashion Stylist Hub
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
          Powered by deep Pakistani menswear styling data. Calculate your posture score, discover complementary palette matching, and receive instant outfit recommendations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -8 }}
          className="bg-[#0E0E14] border border-stone-800 hover:border-[#D4AF37] rounded-2xl p-6 space-y-5 shadow-xl text-center flex flex-col justify-between glass-obsidian"
        >
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg font-bold uppercase">Find Your DHAJ Quiz</h3>
            <p className="text-xs text-stone-400 leading-relaxed font-light">Answer 6 quick questions to get your 0-100 score and 1-click full outfit bundle.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePage('style-quiz')}
            className="w-full shimmer-button bg-[#D4AF37] text-black font-bold text-xs py-3.5 rounded-xl uppercase hover:bg-[#AA8825] transition-colors cursor-pointer shadow-md"
          >
            Launch Quiz
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -8 }}
          className="bg-[#0E0E14] border border-stone-800 hover:border-[#D4AF37] rounded-2xl p-6 space-y-5 shadow-xl text-center flex flex-col justify-between glass-obsidian"
        >
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <Bot className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg font-bold uppercase">AI Fashion Chat Assistant</h3>
            <p className="text-xs text-stone-400 leading-relaxed font-light">Ask natural language questions about Eid, wedding, or fit guidance.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={openStylist}
            className="w-full border border-[#D4AF37] text-[#D4AF37] font-bold text-xs py-3.5 rounded-xl uppercase hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer"
          >
            Open Chat Bot
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -8 }}
          className="bg-[#0E0E14] border border-stone-800 hover:border-[#D4AF37] rounded-2xl p-6 space-y-5 shadow-xl text-center flex flex-col justify-between glass-obsidian"
        >
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg font-bold uppercase">Virtual Wardrobe Matcher</h3>
            <p className="text-xs text-stone-400 leading-relaxed font-light">Upload your own garment photos and get matching waistcoats & shoes.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePage('virtual-wardrobe')}
            className="w-full border border-stone-700 text-white font-bold text-xs py-3.5 rounded-xl uppercase hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            Upload Photos
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, User, Bot, ArrowRight } from 'lucide-react';
import { useAIStore } from '../store/aiStore';

export default function AIChatDrawer({ setActivePage }) {
  const { isStylistOpen, closeStylist, aiChatMessages, addChatMessage } = useAIStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    addChatMessage({ sender: 'user', text: userText });
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = 'For an effortless DHAJ presence, pair our Obsidian Velvet Waistcoat over a Raw Silk Kurta. Would you like me to calculate your personalized DHAJ Match Score?';
      const lower = userText.toLowerCase();
      if (lower.includes('eid')) {
        reply = 'For Eid, I recommend the Sovereign Raw Silk Kurta in Obsidian Black paired with hand-embroidered dabka khussas. It radiates traditional warmth with contemporary prestige.';
      } else if (lower.includes('wedding') || lower.includes('groom')) {
        reply = 'For royal wedding celebrations, the Emperor Gold Zari Sherwani adorned with pearl detailing is unmatched. Would you like to run the "Find Your DHAJ" quiz for a complete breakdown?';
      } else if (lower.includes('size') || lower.includes('fit')) {
        reply = 'DHAJ garments are crafted with our signature Tailored Slim silhouette. Should you require custom sleeve or shoulder measurements, our concierge master tailor will adjust it free of charge.';
      }

      addChatMessage({ sender: 'ai', text: reply });
      setIsTyping(false);
    }, 900);
  };

  return (
    <AnimatePresence>
      {isStylistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeStylist}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="w-screen max-w-md bg-[#0A0A0E] border-l border-[#D4AF37]/40 text-white flex flex-col shadow-2xl glass-obsidian"
            >
              
              {/* Header */}
              <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-gradient-to-r from-[#121217] to-[#0A0A0E]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.3)]">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm tracking-widest text-white uppercase font-bold">DHAJ AI Stylist</h3>
                    <p className="text-[10px] text-[#D4AF37] tracking-widest uppercase font-semibold">Personal Sartorial Concierge</p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={closeStylist}
                  className="text-stone-400 hover:text-[#D4AF37] p-1.5 rounded-full border border-stone-800 hover:border-[#D4AF37] transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Quick Quiz CTA banner */}
              <div className="bg-[#15151F] px-5 py-3 border-b border-[#D4AF37]/20 flex items-center justify-between">
                <span className="text-xs text-stone-300">Discover your optimal 0-100 style score:</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    closeStylist();
                    setActivePage('style-quiz');
                  }}
                  className="bg-[#D4AF37] text-black text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-md uppercase hover:bg-[#AA8825] transition-colors flex items-center gap-1 cursor-pointer shadow-md"
                >
                  Find Your DHAJ <ArrowRight className="w-3 h-3" />
                </motion.button>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <AnimatePresence>
                  {aiChatMessages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'ai' && (
                        <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5 shadow-sm">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#D4AF37] text-black font-semibold rounded-tr-none shadow-md'
                            : 'bg-[#14141C] border border-stone-800 text-stone-200 rounded-tl-none shadow-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                      {msg.sender === 'user' && (
                        <div className="w-7 h-7 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-white shrink-0 mt-0.5">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2 text-stone-400 text-xs items-center pl-9 font-mono"
                  >
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                    <span>DHAJ AI is selecting options...</span>
                  </motion.div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-4 border-t border-stone-800 bg-[#070709] flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about styling, sizes, Eid, or wedding outfits..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-[#111116] border border-stone-800 text-xs text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#D4AF37]"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-[#D4AF37] text-black px-4 rounded-xl flex items-center justify-center hover:bg-[#AA8825] transition-colors cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

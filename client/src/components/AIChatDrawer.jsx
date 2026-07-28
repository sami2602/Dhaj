import React, { useState } from 'react';
import { X, Send, Sparkles, User, Bot, ArrowRight } from 'lucide-react';
import { useAIStore } from '../store/aiStore';

export default function AIChatDrawer({ setActivePage }) {
  const { isStylistOpen, closeStylist, aiChatMessages, addChatMessage } = useAIStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isStylistOpen) return null;

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
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={closeStylist} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A0A0E] border-l border-[#D4AF37]/30 text-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-gradient-to-r from-[#121217] to-[#0A0A0E]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-serif text-sm tracking-widest text-white uppercase font-bold">DHAJ AI Stylist</h3>
                <p className="text-[10px] text-[#D4AF37] tracking-widest uppercase">Personal Sartorial Concierge</p>
              </div>
            </div>
            <button onClick={closeStylist} className="text-stone-400 hover:text-[#D4AF37] p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Quiz CTA banner */}
          <div className="bg-[#15151F] px-5 py-3 border-b border-[#D4AF37]/20 flex items-center justify-between">
            <span className="text-xs text-stone-300">Discover your optimal 0-100 style score:</span>
            <button
              onClick={() => {
                closeStylist();
                setActivePage('style-quiz');
              }}
              className="bg-[#D4AF37] text-black text-[10px] font-bold tracking-wider px-3 py-1.5 rounded uppercase hover:bg-[#AA8825] transition-colors flex items-center gap-1"
            >
              Find Your DHAJ <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {aiChatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl p-3.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#D4AF37] text-black font-medium rounded-tr-none'
                      : 'bg-[#14141C] border border-stone-800 text-stone-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-stone-800 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 text-stone-400 text-xs items-center pl-9">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
                <span>DHAJ AI is selecting options...</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-4 border-t border-stone-800 bg-[#070709] flex gap-2">
            <input
              type="text"
              placeholder="Ask about styling, sizes, Eid, or wedding outfits..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#111116] border border-stone-800 text-xs text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              className="bg-[#D4AF37] text-black px-4 rounded-lg flex items-center justify-center hover:bg-[#AA8825] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

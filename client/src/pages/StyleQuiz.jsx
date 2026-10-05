import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowRight, RefreshCw, ShoppingBag, ShieldCheck, Star } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import confetti from 'canvas-confetti';

export default function StyleQuiz({ setActivePage, products }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    occasion: 'Eid Festive',
    stylePreference: 'Royal Obsidian Velvet',
    budget: '15000-35000',
    fit: 'Tailored Slim Fit',
    colors: ['Obsidian Black', 'Antique Gold'],
    season: 'Autumn/Winter'
  });

  const [quizResult, setQuizResult] = useState(null);

  const addCompleteOutfitToCart = useCartStore((state) => state.addCompleteOutfitToCart);

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      generateResult();
    }
  };

  const generateResult = () => {
    // Fire celebratory gold confetti
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFFDD0', '#AA8825']
    });

    const dataset = products || [];
    const kurta = dataset.find(p => p.category === 'kurta') || dataset[1] || dataset[0];
    const layering = dataset.find(p => p.category === 'waistcoat' || p.category === 'sherwani') || dataset[0];
    const footwear = dataset.find(p => p.category === 'footwear') || dataset[3] || dataset[0];

    const outfitList = [kurta, layering, footwear].filter(Boolean);
    const bundlePrice = outfitList.reduce((sum, item) => sum + (item.salePrice || item.price), 0);

    setQuizResult({
      score: 98,
      lookTitle: `The ${answers.occasion} Sovereign Ensemble`,
      tagline: 'Imperial Black Velvet & Hand-embroidered Gold Tilla',
      explanation: `Calculated for a ${answers.fit} posture during ${answers.occasion}. The obsidian micro velvet waistcoat paired with raw silk kurta creates an imposing yet traditional presence.`,
      outfitList,
      bundlePrice
    });
    setStep(7); // Result screen
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20 space-y-8">
      
      {/* Quiz Progress & Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37] px-4 py-1.5 rounded-full text-[#D4AF37] text-xs font-semibold">
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
          FIND YOUR DHAJ — AI Sartorial Profiler
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white uppercase font-bold tracking-wide">
          Interactive Style Quiz
        </h1>
      </motion.div>

      {step <= 6 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0E0E14] border border-[#D4AF37]/40 rounded-2xl p-8 space-y-8 shadow-[0_0_40px_rgba(212,175,55,0.15)] relative glass-obsidian"
        >
          {/* Animated Progress Bar */}
          <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(step / 6) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-gradient-to-r from-[#F5D77D] via-[#D4AF37] to-[#AA8825] h-full"
            />
          </div>

          <div className="flex justify-between text-xs text-stone-400 font-medium">
            <span>Step {step} of 6</span>
            <span className="text-[#D4AF37] font-semibold">0-100 DHAJ Score Calculator</span>
          </div>

          {/* Animated Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* STEP 1: Occasion */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-lg text-white font-bold">1. Select your target occasion:</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {['Eid Festive', 'Royal Wedding', 'Mehndi Celebration', 'Formal Evening Gala', 'Groom Attire'].map((occ) => (
                      <button
                        key={occ}
                        onClick={() => setAnswers({ ...answers, occasion: occ })}
                        className={`p-4 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                          answers.occasion === occ ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Style Preference */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-lg text-white font-bold">2. Choose your preferred aesthetic:</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {['Royal Obsidian Velvet', 'Classic Raw Silk', 'Contemporary Prince Suit', 'Heavy Dabka Zari'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setAnswers({ ...answers, stylePreference: st })}
                        className={`p-4 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                          answers.stylePreference === st ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Budget */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-lg text-white font-bold">3. Select your investment budget:</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {[
                      { label: 'PKR 10,000 - 25,000', val: '10000-25000' },
                      { label: 'PKR 25,000 - 50,000', val: '25000-50000' },
                      { label: 'PKR 50,000+', val: '50000+' }
                    ].map((b) => (
                      <button
                        key={b.val}
                        onClick={() => setAnswers({ ...answers, budget: b.val })}
                        className={`p-4 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                          answers.budget === b.val ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Fit */}
              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-lg text-white font-bold">4. What is your preferred posture fit?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {['Tailored Slim Fit', 'Classic Relaxed Fit', 'Sculpted V-Taper'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setAnswers({ ...answers, fit: f })}
                        className={`p-4 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                          answers.fit === f ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: Colors */}
              {step === 5 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-lg text-white font-bold">5. Preferred color palette:</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    {['Obsidian Black', 'Antique Gold', 'Midnight Navy', 'Ivory Cream'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setAnswers({ ...answers, colors: [c] })}
                        className={`p-4 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                          answers.colors.includes(c) ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 6: Season */}
              {step === 6 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-lg text-white font-bold">6. Season & Climate:</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {['Autumn/Winter Velvet', 'Spring/Summer Cotton Raw Silk', 'All Season'].map((sea) => (
                      <button
                        key={sea}
                        onClick={() => setAnswers({ ...answers, season: sea })}
                        className={`p-4 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                          answers.season === sea ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        {sea}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Quiz Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-stone-800">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-xs text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                ← Back
              </button>
            ) : <div />}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="shimmer-button bg-[#D4AF37] text-black font-bold text-xs tracking-widest px-8 py-3.5 rounded-lg uppercase hover:bg-[#AA8825] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              {step === 6 ? 'Generate DHAJ Score & Outfit' : 'Next Question'} <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

        </motion.div>
      )}

      {/* QUIZ RESULT SCREEN */}
      {step === 7 && quizResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-[#0A0A0E] border border-[#D4AF37]/50 rounded-2xl p-8 space-y-8 shadow-[0_0_60px_rgba(212,175,55,0.25)] glass-obsidian"
        >
          
          {/* Top Score Banner */}
          <div className="text-center space-y-3 border-b border-stone-800 pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-28 h-28 rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/15 flex flex-col items-center justify-center mx-auto shadow-[0_0_35px_rgba(212,175,55,0.45)]"
            >
              <span className="font-serif text-4xl font-extrabold text-[#D4AF37]">{quizResult.score}</span>
              <span className="text-[9px] tracking-widest text-stone-300 uppercase font-semibold">DHAJ SCORE</span>
            </motion.div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold uppercase">{quizResult.lookTitle}</h2>
            <p className="text-xs text-[#D4AF37] font-serif tracking-widest uppercase font-semibold">{quizResult.tagline}</p>
            <p className="text-xs text-stone-300 max-w-xl mx-auto leading-relaxed font-light">{quizResult.explanation}</p>
          </div>

          {/* Outfit List */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm text-stone-300 uppercase tracking-widest font-semibold">Recommended 3-Piece Outfit Pack:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quizResult.outfitList.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="bg-[#14141C] border border-stone-800 rounded-xl p-3.5 space-y-2.5 hover:border-[#D4AF37]/50 transition-colors"
                >
                  <img src={item.images[0]} alt={item.name} className="w-full h-40 object-cover rounded-lg" />
                  <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider block font-semibold">Item #{i+1}</span>
                  <h4 className="font-serif text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                  <span className="text-xs text-white font-bold block">PKR {(item.salePrice || item.price).toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-stone-800">
            <div>
              <span className="text-xs text-stone-400 block">Total Outfit Investment:</span>
              <span className="font-serif text-2xl font-bold text-[#D4AF37]">PKR {quizResult.bundlePrice.toLocaleString()}</span>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => setStep(1)}
                className="border border-stone-800 text-stone-400 hover:text-white px-5 py-3.5 rounded-lg text-xs uppercase cursor-pointer transition-colors"
              >
                Retake Quiz
              </button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addCompleteOutfitToCart(quizResult.outfitList)}
                className="flex-1 sm:flex-none shimmer-button bg-[#D4AF37] text-black font-bold text-xs tracking-widest px-7 py-3.5 rounded-lg uppercase hover:bg-[#AA8825] flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-4 h-4" /> Add Entire Look to Cart
              </motion.button>
            </div>
          </div>

        </motion.div>
      )}

    </div>
  );
}

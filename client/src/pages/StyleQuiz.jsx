import React, { useState } from 'react';
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
      particleCount: 80,
      spread: 70,
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
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37] px-4 py-1 rounded-full text-[#D4AF37] text-xs font-semibold">
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
          FIND YOUR DHAJ — AI Sartorial Profiler
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white uppercase font-bold tracking-wide">
          Interactive Style Quiz
        </h1>
      </div>

      {step <= 6 && (
        <div className="bg-[#0E0E14] border border-[#D4AF37]/30 rounded-xl p-8 space-y-8 shadow-2xl relative">
          {/* Progress Bar */}
          <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#F5D77D] to-[#D4AF37] h-full transition-all duration-500"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-stone-400">
            <span>Step {step} of 6</span>
            <span className="text-[#D4AF37] font-semibold">0-100 DHAJ Score Calculator</span>
          </div>

          {/* STEP 1: Occasion */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-serif text-lg text-white font-bold">1. Select your target occasion:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Eid Festive', 'Royal Wedding', 'Mehndi Celebration', 'Formal Evening Gala', 'Groom Attire'].map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setAnswers({ ...answers, occasion: occ })}
                    className={`p-4 rounded-lg border text-left text-xs font-medium transition-all ${
                      answers.occasion === occ ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-stone-800 text-stone-300 hover:border-stone-700'
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Royal Obsidian Velvet', 'Classic Raw Silk', 'Contemporary Prince Suit', 'Heavy Dabka Zari'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setAnswers({ ...answers, stylePreference: st })}
                    className={`p-4 rounded-lg border text-left text-xs font-medium transition-all ${
                      answers.stylePreference === st ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-stone-800 text-stone-300 hover:border-stone-700'
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'PKR 10,000 - 25,000', val: '10000-25000' },
                  { label: 'PKR 25,000 - 50,000', val: '25000-50000' },
                  { label: 'PKR 50,000+', val: '50000+' }
                ].map((b) => (
                  <button
                    key={b.val}
                    onClick={() => setAnswers({ ...answers, budget: b.val })}
                    className={`p-4 rounded-lg border text-center text-xs font-medium transition-all ${
                      answers.budget === b.val ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-stone-800 text-stone-300 hover:border-stone-700'
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Tailored Slim Fit', 'Classic Relaxed Fit', 'Sculpted V-Taper'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setAnswers({ ...answers, fit: f })}
                    className={`p-4 rounded-lg border text-center text-xs font-medium transition-all ${
                      answers.fit === f ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-stone-800 text-stone-300 hover:border-stone-700'
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Obsidian Black', 'Antique Gold', 'Midnight Navy', 'Ivory Cream'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setAnswers({ ...answers, colors: [c] })}
                    className={`p-4 rounded-lg border text-center text-xs font-medium transition-all ${
                      answers.colors.includes(c) ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-stone-800 text-stone-300 hover:border-stone-700'
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Autumn/Winter Velvet', 'Spring/Summer Cotton Raw Silk', 'All Season'].map((sea) => (
                  <button
                    key={sea}
                    onClick={() => setAnswers({ ...answers, season: sea })}
                    className={`p-4 rounded-lg border text-center text-xs font-medium transition-all ${
                      answers.season === sea ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-stone-800 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    {sea}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quiz Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-stone-800">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-xs text-stone-400 hover:text-white"
              >
                ← Back
              </button>
            ) : <div />}

            <button
              onClick={handleNext}
              className="bg-[#D4AF37] text-black font-bold text-xs tracking-widest px-8 py-3.5 rounded uppercase hover:bg-[#AA8825] transition-colors flex items-center gap-2"
            >
              {step === 6 ? 'Generate DHAJ Score & Outfit' : 'Next Question'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* QUIZ RESULT SCREEN */}
      {step === 7 && quizResult && (
        <div className="bg-[#0A0A0E] border border-[#D4AF37]/40 rounded-2xl p-8 space-y-8 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
          
          {/* Top Score Banner */}
          <div className="text-center space-y-3 border-b border-stone-800 pb-6">
            <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/10 flex flex-col items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              <span className="font-serif text-3xl font-extrabold text-[#D4AF37]">{quizResult.score}</span>
              <span className="text-[9px] tracking-widest text-stone-300 uppercase">DHAJ SCORE</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold uppercase">{quizResult.lookTitle}</h2>
            <p className="text-xs text-[#D4AF37] font-serif tracking-widest uppercase">{quizResult.tagline}</p>
            <p className="text-xs text-stone-300 max-w-xl mx-auto leading-relaxed">{quizResult.explanation}</p>
          </div>

          {/* Outfit List */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm text-stone-300 uppercase tracking-widest">Recommended 3-Piece Outfit Pack:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quizResult.outfitList.map((item, i) => (
                <div key={i} className="bg-[#14141C] border border-stone-800 rounded-lg p-3 space-y-2">
                  <img src={item.images[0]} alt={item.name} className="w-full h-40 object-cover rounded" />
                  <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider block">Item #{i+1}</span>
                  <h4 className="font-serif text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                  <span className="text-xs text-white font-bold block">PKR {(item.salePrice || item.price).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-stone-800">
            <div>
              <span className="text-xs text-stone-400 block">Total Outfit Investment:</span>
              <span className="font-serif text-xl font-bold text-[#D4AF37]">PKR {quizResult.bundlePrice.toLocaleString()}</span>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => setStep(1)}
                className="border border-stone-800 text-stone-400 hover:text-white px-4 py-3 rounded text-xs uppercase"
              >
                Retake Quiz
              </button>
              <button
                onClick={() => addCompleteOutfitToCart(quizResult.outfitList)}
                className="flex-1 sm:flex-none bg-[#D4AF37] text-black font-bold text-xs tracking-widest px-6 py-3 rounded uppercase hover:bg-[#AA8825] flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add Entire Look to Cart
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

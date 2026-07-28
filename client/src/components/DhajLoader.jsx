import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DhajLoader({ onComplete }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Keep initial loader under 2 seconds as requested
    const timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="dhaj-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] bg-[#050506] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle Fabric & Background Texture Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* Gold Glowing Ring Effect */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.25)] animate-pulse-slow" />
            
            {/* The Official Uploaded DHAJ Circular Logo */}
            <motion.img
              src="/dhaj_logo.png"
              alt="DHAJ Logo"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-44 h-44 sm:w-60 sm:h-60 object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]"
            />
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-center"
          >
            <h2 className="text-sm sm:text-base tracking-[0.35em] text-[#D4AF37] font-serif uppercase font-semibold">
              APNI DHAJ. APNA ANDAAZ.
            </h2>
            <p className="text-xs text-stone-400 mt-1 tracking-widest font-light">
              MODERN PAKISTANI MENSWEAR
            </p>
          </motion.div>

          {/* Gold Line Loader */}
          <div className="w-36 h-[2px] bg-stone-800 rounded-full mt-8 overflow-hidden relative">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import React from 'react';
import { Home, ShoppingBag, Sparkles, Heart, User } from 'lucide-react';
import { useAIStore } from '../store/aiStore';
import { useWishlistStore } from '../store/wishlistStore';

export default function MobileNav({ activePage, setActivePage }) {
  const openStylist = useAIStore((state) => state.openStylist);
  const wishlistCount = useWishlistStore((state) => state.wishlist.length);

  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'ai-stylist', label: 'AI Stylist', icon: Sparkles, highlight: true },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, badge: wishlistCount },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <>
      {/* Floating DHAJ AI Assistant FAB Button */}
      <button
        onClick={openStylist}
        className="fixed bottom-20 right-5 z-40 lg:flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#AA8825] text-black font-semibold px-4 py-3 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:scale-105 transition-transform"
        title="Ask DHAJ AI Stylist"
      >
        <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
        <span className="hidden sm:inline text-xs font-serif tracking-wider uppercase font-bold">
          DHAJ AI
        </span>
      </button>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070709]/95 backdrop-blur-lg border-t border-[#D4AF37]/20 px-4 py-2 flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center py-1 relative ${
                isActive ? 'text-[#D4AF37]' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.highlight ? 'text-[#D4AF37] animate-pulse' : ''}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#D4AF37] text-black text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-wider mt-1 font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

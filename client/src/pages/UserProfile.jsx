import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Sparkles, MapPin, Package, Shield, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import API_BASE_URL, { getAuthConfig } from '../lib/api';

export default function UserProfile({ setActivePage }) {
  const { user, token, logout, setUser } = useAuthStore();
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        setLoadingProfile(true);
        const res = await axios.get(`${API_BASE_URL}/auth/profile`, getAuthConfig(token));
        if (res.data?.success && res.data.user) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.log('Profile sync unavailable, using saved profile');
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [token, setUser]);

  if (!user) {
    return (
      <div className="pt-32 text-center text-white font-serif">
        Please sign in. <button onClick={() => setActivePage('login')} className="text-[#D4AF37] underline">Login</button>
      </div>
    );
  }

  const primaryAddress =
    user.addresses?.find((address) => address.isDefault) ||
    user.addresses?.[0] || {
      label: 'Boutique Residence',
      street: 'Gulberg III, Block MM Alam Road',
      city: 'Lahore',
      postalCode: '54000'
    };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20 space-y-8 text-white">
      
      {/* Header Profile Info */}
      <div className="bg-[#0E0E14] border border-[#D4AF37]/30 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center font-serif text-2xl font-bold text-[#D4AF37]">
            {user.name?.[0] || 'D'}
          </div>
          <div>
            <span className="text-[10px] text-[#D4AF37] uppercase font-serif tracking-widest font-bold">DHAJ Patron Account</span>
            <h1 className="font-serif text-2xl font-bold uppercase">{user.name}</h1>
            <p className="text-xs text-stone-400">{user.email}</p>
            {loadingProfile && <p className="text-[10px] text-stone-500 mt-1">Syncing patron profile...</p>}
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            setActivePage('home');
          }}
          className="border border-stone-800 hover:border-rose-500 text-stone-400 hover:text-rose-400 text-xs px-4 py-2 rounded flex items-center gap-1.5"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Style Vector */}
        <div className="bg-[#0E0E14] border border-stone-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="font-serif text-sm text-[#D4AF37] uppercase tracking-widest font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> AI Style Profile Vector
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-stone-800/50 pb-2">
              <span className="text-stone-400">Posture Fit:</span>
              <span className="text-white font-medium">{user.stylePreferences?.fit || 'Tailored Slim Fit'}</span>
            </div>
            <div className="flex justify-between border-b border-stone-800/50 pb-2">
              <span className="text-stone-400">Favorite Palettes:</span>
              <span className="text-[#D4AF37] font-medium">{user.stylePreferences?.favoriteColors?.join(', ') || 'Obsidian Black, Gold'}</span>
            </div>
            <div className="flex justify-between border-b border-stone-800/50 pb-2">
              <span className="text-stone-400">Target Occasions:</span>
              <span className="text-white font-medium">{user.stylePreferences?.occasions?.join(', ') || 'Eid, Royal Weddings'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Body Stature:</span>
              <span className="text-white font-medium">{user.stylePreferences?.bodyType || 'V-Taper Athletic'}</span>
            </div>
          </div>

          <button
            onClick={() => setActivePage('style-quiz')}
            className="w-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-xs py-2.5 rounded uppercase hover:bg-[#D4AF37] hover:text-black"
          >
            Update AI Style Quiz
          </button>
        </div>

        {/* Saved Address */}
        <div className="bg-[#0E0E14] border border-stone-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="font-serif text-sm text-[#D4AF37] uppercase tracking-widest font-bold flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Default Delivery Location
            </h3>
          </div>

          <div className="text-xs text-stone-300 space-y-1">
            <p className="font-bold text-white">{primaryAddress.label || 'Primary Address'}</p>
            <p>{primaryAddress.street || primaryAddress.address || 'Address available after your first order'}</p>
            <p>
              {[primaryAddress.city, primaryAddress.country || 'Pakistan', primaryAddress.postalCode]
                .filter(Boolean)
                .join(', ')}
            </p>
          </div>

          <button
            onClick={() => setActivePage('orders')}
            className="w-full border border-stone-800 text-stone-300 font-bold text-xs py-2.5 rounded uppercase hover:border-[#D4AF37]"
          >
            View Order History
          </button>
        </div>

      </div>

    </div>
  );
}

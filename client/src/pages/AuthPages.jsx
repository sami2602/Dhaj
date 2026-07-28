import React, { useState } from 'react';
import { Lock, Mail, User, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Login({ setActivePage }) {
  const [email, setEmail] = useState('patron@dhaj.com');
  const [password, setPassword] = useState('password123');
  const login = useAuthStore((state) => state.login);

  const handleLogin = (e) => {
    e.preventDefault();
    login(
      { _id: 'u_demo', name: email.split('@')[0], email, role: email.includes('admin') ? 'admin' : 'user' },
      'mock_jwt_token_2026'
    );
    setActivePage('profile');
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-32 pb-20 text-white space-y-6">
      <div className="text-center space-y-2">
        <img src="/dhaj_logo.png" alt="DHAJ Logo" className="w-16 h-16 object-contain mx-auto" />
        <h1 className="text-2xl font-serif font-bold uppercase tracking-wider">Patron Portal Sign In</h1>
        <p className="text-xs text-stone-400">Access your saved AI posture profiles & order history</p>
      </div>

      <form onSubmit={handleLogin} className="bg-[#0E0E14] border border-stone-800 rounded-xl p-6 space-y-4 shadow-2xl">
        <div>
          <label className="block text-xs text-stone-400 mb-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#14141C] border border-stone-800 p-3 rounded text-xs text-white focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="block text-xs text-stone-400 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#14141C] border border-stone-800 p-3 rounded text-xs text-white focus:border-[#D4AF37]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#D4AF37] text-black font-bold text-xs py-3.5 rounded uppercase hover:bg-[#AA8825] tracking-widest"
        >
          Sign In
        </button>

        <div className="text-center text-xs text-stone-400 pt-2">
          New to DHAJ? <button type="button" onClick={() => setActivePage('register')} className="text-[#D4AF37] hover:underline">Register Patron Account</button>
        </div>
      </form>
    </div>
  );
}

export function Register({ setActivePage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleRegister = (e) => {
    e.preventDefault();
    login(
      { _id: 'u_' + Date.now(), name, email, role: 'user' },
      'mock_jwt_token_2026'
    );
    setActivePage('profile');
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-32 pb-20 text-white space-y-6">
      <div className="text-center space-y-2">
        <img src="/dhaj_logo.png" alt="DHAJ Logo" className="w-16 h-16 object-contain mx-auto" />
        <h1 className="text-2xl font-serif font-bold uppercase tracking-wider">Create Patron Account</h1>
        <p className="text-xs text-stone-400">Unlock private drop access & bespoke tailoring concierge</p>
      </div>

      <form onSubmit={handleRegister} className="bg-[#0E0E14] border border-stone-800 rounded-xl p-6 space-y-4 shadow-2xl">
        <div>
          <label className="block text-xs text-stone-400 mb-1">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#14141C] border border-stone-800 p-3 rounded text-xs text-white focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="block text-xs text-stone-400 mb-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#14141C] border border-stone-800 p-3 rounded text-xs text-white focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="block text-xs text-stone-400 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#14141C] border border-stone-800 p-3 rounded text-xs text-white focus:border-[#D4AF37]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#D4AF37] text-black font-bold text-xs py-3.5 rounded uppercase hover:bg-[#AA8825] tracking-widest"
        >
          Register Account
        </button>

        <div className="text-center text-xs text-stone-400 pt-2">
          Already registered? <button type="button" onClick={() => setActivePage('login')} className="text-[#D4AF37] hover:underline">Sign In</button>
        </div>
      </form>
    </div>
  );
}

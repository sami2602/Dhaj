import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: {
    _id: 'u_demo',
    name: 'Gentleman Patron',
    email: 'patron@dhaj.com',
    role: 'user',
    addresses: [
      { label: 'Boutique Residence', street: 'Gulberg III, Block MM', city: 'Lahore', isDefault: true }
    ],
    stylePreferences: {
      fit: 'Tailored Slim Fit',
      favoriteColors: ['Obsidian Black', 'Antique Gold', 'Midnight Charcoal'],
      occasions: ['Eid', 'Royal Weddings', 'Mehndi'],
      budgetRange: { min: 10000, max: 80000 },
      bodyType: 'V-Taper Athletic'
    }
  },
  token: 'mock_jwt_token_2026',
  isAuthenticated: true,

  login: (userData, token) => set({ user: userData, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  updatePreferences: (prefs) => set((state) => ({
    user: { ...state.user, stylePreferences: { ...state.user.stylePreferences, ...prefs } }
  }))
}));

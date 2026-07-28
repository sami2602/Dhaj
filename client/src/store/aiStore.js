import { create } from 'zustand';

export const useAIStore = create((set) => ({
  isSearchOpen: false,
  isStylistOpen: false,
  quizAnswers: {
    occasion: 'Eid',
    stylePreference: 'Royal Obsidian',
    budget: '15000-30000',
    fit: 'Tailored Slim Fit',
    colors: ['Obsidian Black', 'Antique Gold'],
    season: 'Autumn/Winter'
  },
  dhajScore: 96,
  recommendedOutfit: null,
  aiChatMessages: [
    { sender: 'ai', text: 'Assalamu Alaikum. I am your personal DHAJ AI Stylist. How may I assist in curating your ensemble today?' }
  ],
  wardrobeItems: [
    { id: 'w1', title: 'Black Cotton Pajama', category: 'Pajama', color: 'Black', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=400' }
  ],

  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  toggleStylist: () => set((state) => ({ isStylistOpen: !state.isStylistOpen })),
  openStylist: () => set({ isStylistOpen: true }),
  closeStylist: () => set({ isStylistOpen: false }),

  setQuizAnswer: (key, value) => set((state) => ({
    quizAnswers: { ...state.quizAnswers, [key]: value }
  })),

  setRecommendedOutfit: (outfit, score) => set({ recommendedOutfit: outfit, dhajScore: score }),

  addChatMessage: (msg) => set((state) => ({
    aiChatMessages: [...state.aiChatMessages, msg]
  })),

  addWardrobeItem: (item) => set((state) => ({
    wardrobeItems: [...state.wardrobeItems, { ...item, id: 'w_' + Date.now() }]
  }))
}));

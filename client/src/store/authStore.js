import { create } from 'zustand';

const STORAGE_KEY = 'dhaj_auth';

const loadStoredAuth = () => {
  if (typeof window === 'undefined') {
    return { user: null, token: null, isAuthenticated: false };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { user: null, token: null, isAuthenticated: false };
    }

    const parsed = JSON.parse(raw);
    return {
      user: parsed.user || null,
      token: parsed.token || null,
      isAuthenticated: Boolean(parsed.user && parsed.token)
    };
  } catch (error) {
    return { user: null, token: null, isAuthenticated: false };
  }
};

const persistAuth = (user, token) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
};

const clearStoredAuth = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
};

const storedAuth = loadStoredAuth();

export const useAuthStore = create((set) => ({
  user: storedAuth.user,
  token: storedAuth.token,
  isAuthenticated: storedAuth.isAuthenticated,
  isAuthLoading: false,
  authError: '',

  setAuthLoading: (isAuthLoading) => set({ isAuthLoading }),
  setAuthError: (authError) => set({ authError }),
  clearAuthError: () => set({ authError: '' }),
  login: (userData, token) => {
    persistAuth(userData, token);
    set({ user: userData, token, isAuthenticated: true, authError: '' });
  },
  logout: () => {
    clearStoredAuth();
    set({ user: null, token: null, isAuthenticated: false, authError: '' });
  },
  setUser: (userData) => {
    set((state) => {
      persistAuth(userData, state.token);
      return { user: userData, isAuthenticated: Boolean(userData && state.token) };
    });
  },
  updatePreferences: (prefs) =>
    set((state) => {
      const nextUser = state.user
        ? {
            ...state.user,
            stylePreferences: { ...state.user.stylePreferences, ...prefs }
          }
        : state.user;

      if (nextUser && state.token) {
        persistAuth(nextUser, state.token);
      }

      return { user: nextUser };
    })
}));

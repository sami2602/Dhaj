import { create } from 'zustand';

export const useWishlistStore = create((set, get) => ({
  wishlist: [],
  
  toggleWishlist: (product) => {
    const { wishlist } = get();
    const exists = wishlist.some((item) => item._id === product._id);
    if (exists) {
      set({ wishlist: wishlist.filter((item) => item._id !== product._id) });
    } else {
      set({ wishlist: [...wishlist, product] });
    }
  },

  isInWishlist: (productId) => {
    return get().wishlist.some((item) => item._id === productId);
  }
}));

import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],
  isOpen: false,
  promoCode: '',
  discountPercent: 0,
  
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addToCart: (product, size = 'M', color = 'Obsidian Black', quantity = 1) => {
    const { cart } = get();
    const existingIndex = cart.findIndex(
      (item) => item.product._id === product._id && item.size === size && item.color === color
    );

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      set({ cart: updatedCart, isOpen: true });
    } else {
      set({
        cart: [...cart, { product, size, color, quantity }],
        isOpen: true
      });
    }
  },

  addCompleteOutfitToCart: (outfitItems) => {
    const { cart } = get();
    const newItems = outfitItems.map(item => ({
      product: item,
      size: item.sizes?.[0]?.size || 'M',
      color: item.colors?.[0]?.name || 'Obsidian Black',
      quantity: 1
    }));
    set({ cart: [...cart, ...newItems], isOpen: true });
  },

  removeFromCart: (index) => {
    const { cart } = get();
    const updated = cart.filter((_, i) => i !== index);
    set({ cart: updated });
  },

  updateQuantity: (index, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(index);
      return;
    }
    const { cart } = get();
    const updated = [...cart];
    updated[index].quantity = quantity;
    set({ cart: updated });
  },

  applyPromoCode: (code) => {
    if (code.toUpperCase() === 'DHAJ2026' || code.toUpperCase() === 'ROYAL10') {
      set({ promoCode: code, discountPercent: 10 });
      return { success: true, message: '10% Royal Privilege Discount Applied' };
    }
    return { success: false, message: 'Invalid promo code' };
  },

  clearCart: () => set({ cart: [], promoCode: '', discountPercent: 0 }),

  getSubtotal: () => {
    return get().cart.reduce((sum, item) => {
      const price = item.product.salePrice || item.product.price;
      return sum + price * item.quantity;
    }, 0);
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = (subtotal * get().discountPercent) / 100;
    return subtotal - discount;
  }
}));

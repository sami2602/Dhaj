import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Sparkles, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function CartDrawer({ setActivePage }) {
  const { cart, isOpen, closeCart, removeFromCart, updateQuantity, getSubtotal, getTotal, promoCode, applyPromoCode, discountPercent } = useCartStore();
  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);

  if (!isOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const res = applyPromoCode(inputCode);
    setPromoMessage(res);
  };

  const subtotal = getSubtotal();
  const total = getTotal();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={closeCart}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A0A0D] border-l border-[#D4AF37]/30 text-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-serif text-lg tracking-widest text-white uppercase">Your DHAJ Cart</h2>
            </div>
            <button
              onClick={closeCart}
              className="text-stone-400 hover:text-[#D4AF37] p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* DHAJ Match Score Banner */}
          <div className="bg-[#121217] px-6 py-3 border-b border-[#D4AF37]/20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-stone-300">Ensemble Match Harmony:</span>
            </div>
            <div className="flex items-center gap-1 bg-[#D4AF37]/20 border border-[#D4AF37] px-2.5 py-0.5 rounded text-[11px] font-bold text-[#D4AF37]">
              98 / 100 DHAJ
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto" />
                <p className="font-serif text-sm tracking-widest text-stone-400 uppercase">Your Wardrobe Trunk is Empty</p>
                <button
                  onClick={() => {
                    closeCart();
                    setActivePage('shop');
                  }}
                  className="inline-block bg-[#D4AF37] text-black text-xs font-semibold px-6 py-3 rounded tracking-widest uppercase hover:bg-[#AA8825] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex gap-4 p-3 bg-[#111116] border border-stone-800 rounded relative group">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded border border-stone-800"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-xs text-white truncate font-medium">{item.product.name}</h3>
                    <p className="text-[11px] text-[#D4AF37] mt-0.5 font-semibold">
                      PKR {(item.product.salePrice || item.product.price).toLocaleString()}
                    </p>
                    <div className="flex gap-3 text-[10px] text-stone-400 mt-1">
                      <span>Size: <strong className="text-white">{item.size}</strong></span>
                      <span>Color: <strong className="text-white">{item.color}</strong></span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-stone-700 rounded bg-stone-900">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-stone-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-stone-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Promo & Summary Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-800 bg-[#070709] space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-500" />
                  <input
                    type="text"
                    placeholder="Privilege Code (DHAJ2026)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full bg-[#111116] border border-stone-800 text-xs text-white pl-8 pr-3 py-2 rounded focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-stone-800 text-[#D4AF37] text-xs px-4 rounded hover:bg-[#D4AF37] hover:text-black transition-colors font-medium"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className={`text-[11px] ${promoMessage.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {promoMessage.message}
                </p>
              )}

              {/* Subtotal Calculation */}
              <div className="space-y-1.5 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-white">PKR {subtotal.toLocaleString()}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#D4AF37]">
                    <span>Privilege Discount ({discountPercent}%):</span>
                    <span>- PKR {((subtotal * discountPercent) / 100).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Concierge Shipping:</span>
                  <span className="text-emerald-400">Complimentary</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-800 text-sm font-serif font-bold text-white">
                  <span>Total Amount:</span>
                  <span className="text-[#D4AF37]">PKR {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  closeCart();
                  setActivePage('checkout');
                }}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA8825] text-black text-xs tracking-[0.2em] font-bold py-3.5 rounded uppercase flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Insured Express Delivery across Pakistan & Worldwide
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

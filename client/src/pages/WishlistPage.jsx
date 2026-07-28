import React from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';

export default function WishlistPage({ setActivePage, setSelectedProduct }) {
  const { wishlist, toggleWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8 text-white">
      <div className="border-b border-stone-800 pb-4 flex justify-between items-end">
        <div>
          <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">Saved Pieces</span>
          <h1 className="text-3xl font-serif tracking-wider uppercase mt-1">Your Wishlist</h1>
        </div>
        <span className="text-xs text-stone-400 font-mono">{wishlist.length} Items Saved</span>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <Heart className="w-12 h-12 text-stone-600 mx-auto" />
          <p className="font-serif text-stone-400 uppercase tracking-widest text-sm">Your Wishlist trunk is empty</p>
          <button
            onClick={() => setActivePage('shop')}
            className="bg-[#D4AF37] text-black font-bold text-xs px-6 py-3 rounded uppercase hover:bg-[#AA8825]"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product._id} className="bg-[#0E0E12] border border-stone-800 rounded-lg overflow-hidden flex flex-col justify-between">
              <img src={product.images[0]} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-4 space-y-2">
                <h3 className="font-serif text-sm font-bold text-white truncate">{product.name}</h3>
                <span className="text-xs font-bold text-[#D4AF37]">PKR {(product.salePrice || product.price).toLocaleString()}</span>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-[#D4AF37] text-black font-bold text-xs py-2 rounded uppercase hover:bg-[#AA8825]"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="p-2 border border-stone-800 text-stone-400 hover:text-rose-400 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

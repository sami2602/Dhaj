import React from 'react';
import { CheckCircle2, Sparkles, Truck, PackageCheck, ArrowRight } from 'lucide-react';

export default function OrderSuccess({ lastOrder, setActivePage }) {
  const orderNumber = lastOrder?.orderNumber || 'DHAJ-849201';
  const trackingNumber = lastOrder?.trackingNumber || 'TRK-9812402';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20 space-y-8 text-center text-white">
      
      {/* Icon Badge */}
      <div className="w-20 h-20 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto shadow-[0_0_30px_rgba(212,175,55,0.4)]">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-serif font-bold">Order Received</span>
        <h1 className="text-3xl sm:text-4xl font-serif uppercase font-bold tracking-wide">
          Thank You For Choosing DHAJ
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto">
          Your order has been recorded into our Lahore master atelier. You will receive SMS & WhatsApp status updates shortly.
        </p>
      </div>

      {/* Summary Box */}
      <div className="bg-[#0E0E14] border border-[#D4AF37]/30 rounded-xl p-6 text-left space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between border-b border-stone-800 pb-3 gap-2">
          <div>
            <span className="text-[10px] text-stone-400 uppercase">Order Reference:</span>
            <div className="font-serif text-base font-bold text-[#D4AF37]">{orderNumber}</div>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 uppercase">Airway Tracking ID:</span>
            <div className="font-mono text-xs font-bold text-white">{trackingNumber}</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-3 gap-2 py-4 border-b border-stone-800 text-center">
          <div className="space-y-1">
            <PackageCheck className="w-5 h-5 text-[#D4AF37] mx-auto" />
            <span className="text-[10px] text-stone-300 font-bold block">Processing</span>
            <span className="text-[9px] text-stone-500">At Atelier</span>
          </div>
          <div className="space-y-1">
            <Truck className="w-5 h-5 text-stone-600 mx-auto" />
            <span className="text-[10px] text-stone-500 block">Dispatch</span>
            <span className="text-[9px] text-stone-600">48 Hours</span>
          </div>
          <div className="space-y-1">
            <Sparkles className="w-5 h-5 text-stone-600 mx-auto" />
            <span className="text-[10px] text-stone-500 block">Delivered</span>
            <span className="text-[9px] text-stone-600">Concierge Delivery</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs pt-2">
          <span className="text-stone-400">Total Paid / COD Amount:</span>
          <span className="font-serif font-bold text-base text-[#D4AF37]">
            PKR {(lastOrder?.totalAmount || 18500).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="pt-4 flex justify-center gap-4">
        <button
          onClick={() => setActivePage('orders')}
          className="bg-[#D4AF37] text-black font-bold text-xs tracking-widest px-8 py-3.5 rounded uppercase hover:bg-[#AA8825] transition-colors"
        >
          Track Order Status
        </button>
        <button
          onClick={() => setActivePage('home')}
          className="border border-stone-800 text-stone-300 hover:text-white px-8 py-3.5 rounded text-xs uppercase"
        >
          Return Home
        </button>
      </div>

    </div>
  );
}

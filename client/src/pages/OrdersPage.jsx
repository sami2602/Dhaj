import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import API_BASE_URL, { getAuthConfig } from '../lib/api';

export default function OrdersPage({ setActivePage, lastOrder }) {
  const token = useAuthStore((state) => state.token);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;

      try {
        setLoadingOrders(true);
        const res = await axios.get(`${API_BASE_URL}/orders/my-orders`, getAuthConfig(token));
        setOrders(res.data?.orders || []);
      } catch (error) {
        console.log('Orders sync unavailable, using local order history');
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [token]);

  const fallbackOrders = [
    {
      _id: 'ord_1',
      orderNumber: 'DHAJ-894210',
      date: 'July 24, 2026',
      total: 16500,
      status: 'Delivered',
      items: [
        { name: 'Royal Obsidian Velvet Waistcoat', size: 'M', price: 16500, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=400' }
      ]
    }
  ];

  const visibleOrders = useMemo(() => {
    const baseOrders = orders.length > 0 ? orders : fallbackOrders;
    const normalizedOrders = baseOrders.map((ord) => ({
      ...ord,
      date: ord.date || (ord.createdAt ? new Date(ord.createdAt).toLocaleDateString() : 'Recently'),
      total: ord.total ?? ord.totalAmount ?? 0,
      status: ord.status || ord.orderStatus || 'Processing',
      items: ord.items || []
    }));

    if (lastOrder) {
      normalizedOrders.unshift({
        _id: lastOrder._id || 'ord_recent',
        orderNumber: lastOrder.orderNumber,
        date: 'Today',
        total: lastOrder.totalAmount,
        status: 'Processing at Atelier',
        items: lastOrder.items || []
      });
    }

    return normalizedOrders;
  }, [fallbackOrders, lastOrder, orders]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20 space-y-8 text-white">
      <div className="border-b border-stone-800 pb-4">
        <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">Orders & Tracking</span>
        <h1 className="text-3xl font-serif tracking-wider uppercase mt-1">Patron Order History</h1>
      </div>

      {loadingOrders && <p className="text-xs text-stone-500">Refreshing your latest orders...</p>}

      <div className="space-y-6">
        {visibleOrders.map((ord) => (
          <div key={ord._id} className="bg-[#0E0E14] border border-stone-800 rounded-xl p-6 space-y-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between border-b border-stone-800 pb-3 gap-2">
              <div>
                <span className="text-[10px] text-stone-400 uppercase">Order ID:</span>
                <h3 className="font-serif text-base font-bold text-[#D4AF37]">{ord.orderNumber}</h3>
                <p className="text-[10px] text-stone-500 mt-1">{ord.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800 font-medium">
                  {ord.status}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {ord.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  {item.image && <img src={item.image} alt="" className="w-14 h-16 object-cover rounded border border-stone-800" />}
                  <div>
                    <h4 className="font-serif text-xs font-bold text-white">{item.name}</h4>
                    <span className="text-[10px] text-stone-400">Size: {item.size || 'M'}</span>
                    <span className="text-xs font-bold text-[#D4AF37] block mt-0.5">PKR {item.price?.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-stone-800 text-xs">
              <span className="text-stone-400">Total Investment:</span>
              <span className="font-serif text-sm font-bold text-white">PKR {ord.total.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

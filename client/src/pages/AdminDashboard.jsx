import React, { useState } from 'react';
import { Shield, TrendingUp, Package, Users, Sparkles, Plus, Check, Edit, Trash2 } from 'lucide-react';

export default function AdminDashboard({ products }) {
  const [activeTab, setActiveTab] = useState('overview');

  const metrics = {
    totalRevenue: 1485000,
    totalOrders: 142,
    activePatrons: 890,
    averageDhajScore: 96.4,
    aiSearches: 1240
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-8 text-white">
      
      {/* Header */}
      <div className="border-b border-stone-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[#D4AF37] text-xs font-serif tracking-widest uppercase font-bold">
            <Shield className="w-4 h-4" /> Admin Atelier Portal
          </div>
          <h1 className="text-3xl font-serif tracking-wider uppercase mt-1">DHAJ Management Dashboard</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`text-xs px-4 py-2 rounded font-bold uppercase transition-colors ${
              activeTab === 'overview' ? 'bg-[#D4AF37] text-black' : 'bg-[#0E0E14] text-stone-300 border border-stone-800'
            }`}
          >
            Overview Metrics
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`text-xs px-4 py-2 rounded font-bold uppercase transition-colors ${
              activeTab === 'products' ? 'bg-[#D4AF37] text-black' : 'bg-[#0E0E14] text-stone-300 border border-stone-800'
            }`}
          >
            Manage Catalog ({products?.length || 0})
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0E0E14] border border-[#D4AF37]/30 rounded-xl p-5 space-y-2 shadow-xl">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest block">Total Gross Revenue</span>
              <div className="font-serif text-2xl font-bold text-[#D4AF37]">PKR {metrics.totalRevenue.toLocaleString()}</div>
              <span className="text-[10px] text-emerald-400 font-mono">+18.4% vs last month</span>
            </div>

            <div className="bg-[#0E0E14] border border-stone-800 rounded-xl p-5 space-y-2 shadow-xl">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest block">Completed Orders</span>
              <div className="font-serif text-2xl font-bold text-white">{metrics.totalOrders} Orders</div>
              <span className="text-[10px] text-emerald-400 font-mono">100% Express Dispatched</span>
            </div>

            <div className="bg-[#0E0E14] border border-stone-800 rounded-xl p-5 space-y-2 shadow-xl">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest block">Active Patrons</span>
              <div className="font-serif text-2xl font-bold text-white">{metrics.activePatrons} Registered</div>
              <span className="text-[10px] text-[#D4AF37] font-mono">82% Repeat Buyers</span>
            </div>

            <div className="bg-[#0E0E14] border border-[#D4AF37]/30 rounded-xl p-5 space-y-2 shadow-xl">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest block">Average DHAJ Score</span>
              <div className="font-serif text-2xl font-bold text-[#D4AF37] flex items-center gap-2">
                {metrics.averageDhajScore} / 100 <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="text-[10px] text-stone-400 font-mono">{metrics.aiSearches} AI Consultations</span>
            </div>
          </div>

          {/* AI Analytics Chart Box */}
          <div className="bg-[#0E0E14] border border-stone-800 rounded-xl p-6 space-y-4">
            <h3 className="font-serif text-sm text-[#D4AF37] uppercase tracking-widest font-bold">
              AI Fashion Query Analytics Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#14141C] p-3 rounded border border-stone-800 space-y-1">
                <span className="text-stone-400 block">Top Searched Occasion:</span>
                <span className="font-bold text-white text-sm">Eid Festive & Groom Sherwani</span>
              </div>
              <div className="bg-[#14141C] p-3 rounded border border-stone-800 space-y-1">
                <span className="text-stone-400 block">Most Popular Palette:</span>
                <span className="font-bold text-[#D4AF37] text-sm">Obsidian Velvet & Antique Gold</span>
              </div>
              <div className="bg-[#14141C] p-3 rounded border border-stone-800 space-y-1">
                <span className="text-stone-400 block">Preferred Posture Fit:</span>
                <span className="font-bold text-white text-sm">Tailored Slim Fit (74%)</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Catalog Table */}
      {activeTab === 'products' && (
        <div className="bg-[#0E0E14] border border-stone-800 rounded-xl p-6 space-y-4 shadow-2xl">
          <div className="flex justify-between items-center border-b border-stone-800 pb-3">
            <h3 className="font-serif text-sm text-white uppercase font-bold">Imperial Catalog Inventory</h3>
            <button className="bg-[#D4AF37] text-black font-bold text-xs px-4 py-2 rounded uppercase hover:bg-[#AA8825] flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Add New Garment
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-stone-800 text-stone-400 uppercase font-serif">
                <tr>
                  <th className="py-3 px-2">Garment</th>
                  <th className="py-3 px-2">Category</th>
                  <th className="py-3 px-2">Price (PKR)</th>
                  <th className="py-3 px-2">Stock</th>
                  <th className="py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {products?.map((p) => (
                  <tr key={p._id} className="hover:bg-[#14141C]">
                    <td className="py-3 px-2 flex items-center gap-3 font-serif font-bold text-white">
                      <img src={p.images[0]} alt="" className="w-10 h-12 object-cover rounded border border-stone-800" />
                      {p.name}
                    </td>
                    <td className="py-3 px-2 capitalize text-stone-300">{p.category}</td>
                    <td className="py-3 px-2 text-[#D4AF37] font-bold">{(p.salePrice || p.price).toLocaleString()}</td>
                    <td className="py-3 px-2 text-emerald-400 font-mono">In Stock (24)</td>
                    <td className="py-3 px-2 flex gap-2">
                      <button className="p-1.5 border border-stone-800 hover:border-[#D4AF37] text-stone-400 hover:text-white rounded">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 border border-stone-800 hover:border-rose-500 text-stone-400 hover:text-rose-400 rounded">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

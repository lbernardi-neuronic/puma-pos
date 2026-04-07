'use client';

import { mockTickets, mockHourlySales } from '@/lib/mock-data';
import { TrendingUp, Receipt, DollarSign, XCircle } from 'lucide-react';
import clsx from 'clsx';
import Header from '@/components/pos/Header';

export default function ReportesPage() {
  // KPI calculations
  const completedTickets = mockTickets.filter(t => t.status === 'completado');
  const totalVentas = completedTickets.reduce((a, t) => a + t.total, 0);
  const ticketCount = completedTickets.length;
  const promedioTicket = ticketCount > 0 ? totalVentas / ticketCount : 0;
  const anulaciones = mockTickets.filter(t => t.status === 'anulado').length;

  // Chart max for bar scaling
  const maxHourly = Math.max(...mockHourlySales.map(h => h.amount));

  // Top products
  const productMap: Record<string, number> = {};
  completedTickets.forEach(t => {
    t.items.forEach(item => {
      productMap[item.name] = (productMap[item.name] || 0) + item.quantity;
    });
  });
  const topProducts = Object.entries(productMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Payment distribution
  const payMap: Record<string, number> = {};
  completedTickets.forEach(t => {
    const group = t.paymentMethod === 'Visa' || t.paymentMethod === 'Mastercard' ? 'Tarjeta' :
                  t.paymentMethod === 'Efectivo' ? 'Efectivo' : 'Digital';
    payMap[group] = (payMap[group] || 0) + t.total;
  });
  const payTotal = Object.values(payMap).reduce((a, b) => a + b, 0);

  const payColors: Record<string, string> = {
    'Efectivo': 'bg-brand-primary',
    'Tarjeta': 'bg-blue-500',
    'Digital': 'bg-violet-500',
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-brand-secondary overflow-hidden">
      <Header />

      <div className="flex-1 overflow-y-auto px-8 py-6">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-brand-primary" />
            Reportes del Turno
          </h1>
          <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mt-1 ml-9">Resumen de operaciones — Turno Mañana</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-3">
              <DollarSign className="w-5 h-5 text-brand-primary" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Ventas Total</p>
            <p className="text-2xl font-black text-slate-900 tracking-tighter">${totalVentas.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
              <Receipt className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Tickets</p>
            <p className="text-2xl font-black text-slate-900 tracking-tighter">{ticketCount}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Promedio Ticket</p>
            <p className="text-2xl font-black text-slate-900 tracking-tighter">${promedioTicket.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-3">
              <XCircle className="w-5 h-5 text-pumas-red" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Anulaciones</p>
            <p className="text-2xl font-black text-pumas-red tracking-tighter">{anulaciones}</p>
          </div>
        </div>

        {/* Hourly Sales Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <h2 className="text-sm font-bold text-slate-800 tracking-tight mb-6">Ventas por Hora</h2>
          <div className="space-y-3">
            {mockHourlySales.map(h => (
              <div key={h.hour} className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-400 w-12 shrink-0 font-mono">{h.hour}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-primary to-brand-primary-dark rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                    style={{ width: `${(h.amount / maxHourly) * 100}%` }}
                  >
                    {(h.amount / maxHourly) > 0.3 && (
                      <span className="text-[10px] font-bold text-white">{h.tickets} tickets</span>
                    )}
                  </div>
                </div>
                <span className="text-sm font-black text-slate-800 w-20 text-right">${h.amount.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Top Products + Payment Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Products */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-800 tracking-tight mb-4">Top 5 Productos</h2>
            <div className="space-y-3">
              {topProducts.map(([name, qty], idx) => (
                <div key={name} className="flex items-center gap-3">
                  <span className={clsx(
                    "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0",
                    idx === 0 ? "bg-brand-primary" : idx === 1 ? "bg-brand-primary/70" : "bg-slate-400"
                  )}>
                    {idx + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium text-slate-700 truncate">{name}</span>
                  <span className="text-sm font-black text-slate-800">x{qty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Distribution */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-800 tracking-tight mb-4">Distribución por Método de Pago</h2>
            <div className="space-y-4">
              {Object.entries(payMap).map(([method, amount]) => {
                const pct = payTotal > 0 ? (amount / payTotal) * 100 : 0;
                return (
                  <div key={method}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-bold text-slate-700">{method}</span>
                      <span className="text-xs font-bold text-slate-400">{pct.toFixed(0)}% — ${amount.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={clsx("h-full rounded-full transition-all duration-500", payColors[method] || 'bg-slate-400')}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Total</span>
              <span className="text-xl font-black text-slate-900">${payTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

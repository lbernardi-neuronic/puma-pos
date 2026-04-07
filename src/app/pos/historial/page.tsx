'use client';

import { mockTickets, Ticket } from '@/lib/mock-data';
import { Printer, XCircle, ChevronDown, ChevronUp, Receipt } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import Header from '@/components/pos/Header';

type PayFilter = 'Todos' | 'Efectivo' | 'Tarjeta' | 'Digital';

const paymentIcon: Record<string, string> = {
  'Efectivo': '💵',
  'Visa': '💳',
  'Mastercard': '💳',
  'MercadoPago QR': '📱',
  'MODO': '📱',
};

export default function HistorialPage() {
  const [tickets, setTickets] = useState(mockTickets);
  const [filter, setFilter] = useState<PayFilter>('Todos');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredTickets = tickets.filter(t => {
    if (filter === 'Todos') return true;
    if (filter === 'Efectivo') return t.paymentMethod === 'Efectivo';
    if (filter === 'Tarjeta') return t.paymentMethod === 'Visa' || t.paymentMethod === 'Mastercard';
    if (filter === 'Digital') return t.paymentMethod === 'MercadoPago QR' || t.paymentMethod === 'MODO';
    return true;
  });

  const totalTurno = tickets.filter(t => t.status === 'completado').reduce((a, t) => a + t.total, 0);
  const ticketCount = tickets.filter(t => t.status === 'completado').length;
  const promedioTicket = ticketCount > 0 ? totalTurno / ticketCount : 0;

  const handleAnular = (id: string) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: 'anulado' as const } : t));
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-brand-secondary overflow-hidden">
      <Header />

      <div className="flex-1 overflow-y-auto px-8 py-6">
        {/* Title + Filters */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
              <Receipt className="w-6 h-6 text-brand-primary" />
              Historial de Ventas
            </h1>
            <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mt-1 ml-9">Tickets del turno actual</p>
          </div>

          <div className="flex gap-2">
            {(['Todos', 'Efectivo', 'Tarjeta', 'Digital'] as PayFilter[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx(
                  "px-4 py-2 rounded-lg font-bold text-xs transition-all",
                  filter === f
                    ? "bg-brand-primary-dark text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Total del Turno</p>
            <p className="text-2xl font-black text-slate-900 tracking-tighter">${totalTurno.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Tickets</p>
            <p className="text-2xl font-black text-slate-900 tracking-tighter">{ticketCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Promedio</p>
            <p className="text-2xl font-black text-slate-900 tracking-tighter">${promedioTicket.toFixed(2)}</p>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 tracking-widest uppercase items-center">
            <span className="col-span-2">Ticket</span>
            <span className="col-span-2">Hora</span>
            <span className="col-span-2">Items</span>
            <span className="col-span-2">M. Pago</span>
            <span className="col-span-2">Total</span>
            <span className="col-span-2 text-right">Estado</span>
          </div>

          {/* Rows */}
          {filteredTickets.map(ticket => (
            <div key={ticket.id}>
              {/* Main Row */}
              <div
                onClick={() => setExpandedId(expandedId === ticket.id ? null : ticket.id)}
                className={clsx(
                  "grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-slate-50 hover:bg-slate-50 transition-colors",
                  ticket.status === 'anulado' && "opacity-50"
                )}
              >
                <span className="col-span-2 text-xs font-bold font-mono text-brand-primary flex items-center gap-2">
                  {ticket.id}
                  {expandedId === ticket.id ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                </span>
                <span className="col-span-2 text-sm font-medium text-slate-700">{ticket.time}</span>
                <span className="col-span-2 text-sm font-medium text-slate-700">{ticket.items.length} productos</span>
                <span className="col-span-2 text-sm font-medium text-slate-700 flex items-center gap-1.5">
                  <span>{paymentIcon[ticket.paymentMethod] || '💳'}</span>
                  {ticket.paymentMethod}
                </span>
                <span className="col-span-2 text-sm font-black text-slate-800">${ticket.total.toFixed(2)}</span>
                <span className="col-span-2 text-right">
                  {ticket.status === 'completado' ? (
                    <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-full">✓ Completado</span>
                  ) : (
                    <span className="text-[10px] font-bold text-pumas-red bg-red-50 px-2.5 py-1 rounded-full">✗ Anulado</span>
                  )}
                </span>
              </div>

              {/* Expanded Detail */}
              {expandedId === ticket.id && (
                <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
                  <div className="space-y-2 mb-4">
                    {ticket.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-slate-600">
                          {item.name} <span className="text-slate-400">x{item.quantity}</span>
                        </span>
                        <span className="font-bold text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                    <div className="text-xs text-slate-400 font-medium">
                      IVA (21%): <span className="font-bold text-slate-600">${(ticket.total * 0.21).toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5">
                        <Printer className="w-3.5 h-3.5" />
                        Reimprimir
                      </button>
                      {ticket.status === 'completado' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleAnular(ticket.id); }}
                          className="px-4 py-2 bg-red-50 hover:bg-red-100 text-pumas-red font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Anular
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

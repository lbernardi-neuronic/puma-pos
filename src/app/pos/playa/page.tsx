'use client';

import { mockPumps, mockDispatches, Pump } from '@/lib/mock-data';
import { Fuel, Droplets, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import Header from '@/components/pos/Header';

const statusConfig = {
  'Libre':             { color: 'bg-brand-primary', text: 'text-brand-primary', border: 'border-brand-primary', bg: 'bg-brand-primary/5', dot: '🟢' },
  'Despachando':       { color: 'bg-pumas-red', text: 'text-pumas-red', border: 'border-pumas-red', bg: 'bg-red-50', dot: '🔴' },
  'Listo':             { color: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-400', bg: 'bg-amber-50', dot: '🟡' },
  'Fuera de Servicio': { color: 'bg-slate-400', text: 'text-slate-400', border: 'border-slate-300', bg: 'bg-slate-50', dot: '⚫' },
};

export default function PlayaPage() {
  const [pumps, setPumps] = useState(mockPumps);

  const getConfig = (p: Pump) => statusConfig[p.status];

  return (
    <div className="flex-1 flex flex-col h-full bg-brand-secondary overflow-hidden">
      <Header />

      <div className="flex-1 overflow-y-auto px-8 py-6">
        {/* Title */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
              <Fuel className="w-7 h-7 text-brand-primary" />
              Control de Playa
            </h1>
            <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mt-1 ml-10">Estado de surtidores en tiempo real</p>
          </div>
          <div className="flex gap-4 text-[10px] font-bold tracking-widest uppercase text-slate-400">
            <span className="flex items-center gap-1.5">🟢 Libre</span>
            <span className="flex items-center gap-1.5">🔴 Despachando</span>
            <span className="flex items-center gap-1.5">🟡 Listo</span>
            <span className="flex items-center gap-1.5">⚫ Fuera Serv.</span>
          </div>
        </div>

        {/* Pumps Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {pumps.map((pump) => {
            const cfg = getConfig(pump);
            return (
              <div
                key={pump.id}
                className={clsx(
                  "bg-white rounded-2xl border-2 p-6 shadow-sm transition-all hover:shadow-md relative overflow-hidden",
                  cfg.border
                )}
              >
                {/* Status indicator strip */}
                <div className={clsx("absolute top-0 left-0 right-0 h-1.5", cfg.color)} />

                {/* Header */}
                <div className="flex justify-between items-start mb-4 pt-1">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{pump.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm">{cfg.dot}</span>
                      <span className={clsx("text-xs font-bold", cfg.text)}>{pump.status}</span>
                    </div>
                  </div>
                  {pump.status === 'Fuera de Servicio' && (
                    <AlertTriangle className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                {/* Amount */}
                <p className={clsx(
                  "text-4xl font-black tracking-tighter mb-1",
                  pump.status === 'Libre' || pump.status === 'Fuera de Servicio' ? "text-slate-300" : cfg.text
                )}>
                  ${pump.amount.toFixed(2)}
                </p>

                {/* Fuel info */}
                {pump.fuelType && (
                  <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Fuel className="w-3.5 h-3.5" />
                      {pump.fuelType}
                    </span>
                    <span className="flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5" />
                      {pump.liters?.toFixed(1)} Lts
                    </span>
                  </div>
                )}

                {/* Action Button */}
                {pump.status === 'Libre' && (
                  <button className="w-full py-3 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary font-bold text-sm rounded-xl transition-colors mt-2">
                    Iniciar Despacho
                  </button>
                )}
                {pump.status === 'Despachando' && (
                  <button className="w-full py-3 bg-red-50 hover:bg-red-100 text-pumas-red font-bold text-sm rounded-xl transition-colors mt-2 animate-pulse">
                    ⏳ Despachando...
                  </button>
                )}
                {pump.status === 'Listo' && (
                  <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-amber-500/20 mt-2">
                    Cobrar Despacho
                  </button>
                )}
                {pump.status === 'Fuera de Servicio' && (
                  <button className="w-full py-3 bg-slate-100 text-slate-400 font-bold text-sm rounded-xl mt-2" disabled>
                    Fuera de Servicio
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Recent Dispatches Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">Últimos Despachos</h2>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Turno actual</span>
          </div>

          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-100 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
            <span className="col-span-2">Ticket</span>
            <span className="col-span-2">Surtidor</span>
            <span className="col-span-3">Combustible</span>
            <span className="col-span-2">Litros</span>
            <span className="col-span-2">Monto</span>
            <span className="col-span-1 text-right">Hora</span>
          </div>

          {mockDispatches.map(d => (
            <div key={d.id} className="grid grid-cols-12 gap-4 px-6 py-3.5 items-center border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
              <span className="col-span-2 text-xs font-bold font-mono text-brand-primary">{d.id}</span>
              <span className="col-span-2 text-sm font-medium text-slate-700">{d.pumpName}</span>
              <span className="col-span-3 text-sm font-medium text-slate-700">{d.fuelType}</span>
              <span className="col-span-2 text-sm font-medium text-slate-500">{d.liters.toFixed(1)} L</span>
              <span className="col-span-2 text-sm font-black text-slate-800">${d.amount.toFixed(2)}</span>
              <span className="col-span-1 text-xs font-bold text-slate-400 text-right">{d.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

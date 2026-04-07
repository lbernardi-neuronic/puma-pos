'use client';

import { Printer, DollarSign, Search, Smartphone, Tag, BarChart3, RefreshCw, XCircle } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/pos/Header';

interface ServiceAction {
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  color: string;
  bgColor: string;
}

const services: ServiceAction[] = [
  { icon: <Printer className="w-8 h-8" />, label: 'Reimprimir Ticket', shortcut: 'F3', color: 'text-slate-700', bgColor: 'bg-slate-100' },
  { icon: <DollarSign className="w-8 h-8" />, label: 'Abrir Cajón', shortcut: 'F4', color: 'text-brand-primary', bgColor: 'bg-brand-primary/10' },
  { icon: <Search className="w-8 h-8" />, label: 'Consulta de Precio', shortcut: 'F5', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { icon: <Smartphone className="w-8 h-8" />, label: 'Recarga Celular', color: 'text-violet-600', bgColor: 'bg-violet-50' },
  { icon: <Tag className="w-8 h-8" />, label: 'Anular Último', shortcut: 'F6', color: 'text-amber-600', bgColor: 'bg-amber-50' },
  { icon: <BarChart3 className="w-8 h-8" />, label: 'Cierre de Turno', shortcut: 'F12', color: 'text-brand-primary-dark', bgColor: 'bg-brand-secondary' },
  { icon: <RefreshCw className="w-8 h-8" />, label: 'Cambio de Turno', color: 'text-slate-600', bgColor: 'bg-slate-100' },
  { icon: <XCircle className="w-8 h-8" />, label: 'Anular Venta', color: 'text-pumas-red', bgColor: 'bg-red-50' },
];

export default function ServiciosPage() {
  const [flash, setFlash] = useState<string | null>(null);

  const handleAction = (label: string) => {
    setFlash(label);
    setTimeout(() => setFlash(null), 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-brand-secondary overflow-hidden">
      <Header />

      <div className="flex-1 overflow-y-auto px-8 py-6">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter">⚙️ Servicios y Utilidades</h1>
          <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mt-1 ml-8">Funciones rápidas del terminal</p>
        </div>

        {/* Toast notification */}
        {flash && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-brand-primary-dark text-white px-6 py-3 rounded-xl shadow-lg font-bold text-sm flex items-center gap-2 animate-bounce">
            ✅ {flash} — Ejecutado
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {services.map((svc) => (
            <button
              key={svc.label}
              onClick={() => handleAction(svc.label)}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all active:scale-95 flex flex-col items-center text-center gap-3 group"
            >
              <div className={`w-16 h-16 ${svc.bgColor} rounded-2xl flex items-center justify-center ${svc.color} group-hover:scale-110 transition-transform`}>
                {svc.icon}
              </div>
              <span className="text-sm font-bold text-slate-800">{svc.label}</span>
              {svc.shortcut && (
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono">
                  {svc.shortcut}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Terminal Info Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-slate-800 tracking-tight mb-4">Información del Terminal</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Terminal</p>
              <p className="text-lg font-black text-slate-800">04</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Turno</p>
              <p className="text-lg font-black text-slate-800">Mañana</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Cajero</p>
              <p className="text-lg font-black text-slate-800">Juan P.</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Inicio</p>
              <p className="text-lg font-black text-slate-800">06:00</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Ventas del Turno</p>
              <p className="text-lg font-black text-brand-primary">47</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

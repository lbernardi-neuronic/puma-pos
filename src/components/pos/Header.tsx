'use client';

import { Search, History, Clock, Printer } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';

export default function Header() {
  const { openModal } = useUIStore();

  return (
    <header className="h-20 w-full flex items-center justify-between px-8 bg-white border-b border-slate-200 flex-shrink-0 z-0">
      <div className="flex items-center gap-4 border-r border-slate-200 pr-8">
        <h1 className="text-lg font-black text-brand-primary tracking-tight">Puma Shop POS</h1>
      </div>

      <div className="flex-1 max-w-xl px-8">
        <div 
          className="w-full h-11 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-400 rounded-xl flex items-center px-4 gap-3 cursor-pointer transition-colors"
          onClick={() => openModal('product_search')}
        >
          <Search className="w-5 h-5 opacity-50" />
          <span className="text-sm font-medium">Buscar productos o SKU...</span>
          <div className="ml-auto flex items-center gap-1">
            <span className="text-[10px] font-bold border border-slate-300 rounded px-1.5 py-0.5 bg-white text-slate-400 shadow-sm">F1</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors" title="Historial Ticket">
          <History className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors" title="Turno">
          <Clock className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors" title="Reimprimir">
          <Printer className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

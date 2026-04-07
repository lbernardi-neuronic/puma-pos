'use client';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-sm border border-slate-200">
        <div className="w-16 h-16 bg-red-50 text-pumas-red rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Algo salió mal</h2>
        <p className="text-[10px] font-medium text-slate-500 mb-6 font-mono bg-slate-50 p-2 rounded break-words">
          {error.message || 'Error inesperado en el sistema'}
        </p>
        <button onClick={() => reset()} className="w-full flex justify-center items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 px-6 rounded-xl transition-all">
          <RefreshCcw className="w-4 h-4" /> Intentar nuevamente
        </button>
      </div>
    </div>
  );
}

'use client';

import { useUIStore } from '@/store/useUIStore';
import { useCartStore } from '@/store/useCartStore';
import { mockProducts } from '@/lib/mock-data';
import { X, Search, Printer, CheckCircle2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

export default function POSModals() {
  const { activeModal, closeModal } = useUIStore();

  if (activeModal === 'none') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/40 backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={closeModal} />
      
      {activeModal === 'product_search' && <SearchModal />}
      {activeModal === 'checkout_success' && <CheckoutModal />}
    </div>
  );
}

function SearchModal() {
  const { closeModal } = useUIStore();
  const addItem = useCartStore(state => state.addItem);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = mockProducts.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.sku.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowDown') setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    if (e.key === 'ArrowUp') setSelectedIndex(prev => Math.max(prev - 1, 0));
    if (e.key === 'Enter' && results[selectedIndex]) {
      addItem(results[selectedIndex]);
      closeModal();
    }
  };

  return (
    <div className="relative w-full max-w-4xl bg-brand-secondary rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white border-b border-slate-100">
        <h2 className="text-xl font-black text-brand-primary-dark tracking-wide italic">BÚSQUEDA DE PRODUCTOS</h2>
        <button onClick={closeModal} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search Input */}
      <div className="p-6 bg-white border-b border-slate-100">
        <div className="flex items-center gap-3 bg-brand-secondary border border-slate-200 rounded-xl px-4 py-3 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all">
          <Search className="w-6 h-6 text-brand-primary" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Puma"
            className="flex-1 bg-transparent border-none outline-none text-xl text-slate-800 placeholder-slate-400"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* Results Header */}
      <div className="px-6 py-4 flex justify-between items-center text-[11px] font-bold text-slate-500 tracking-wider">
        <span>{results.length} RESULTADOS ENCONTRADOS</span>
        <div className="flex gap-2">
          <span className="bg-slate-200/50 px-3 py-1.5 rounded-md">FILTRAR: TODO</span>
          <span className="bg-slate-200/50 px-3 py-1.5 rounded-md">ORDENAR: RELEVANCIA</span>
        </div>
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-100 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
            <span className="col-span-2">Código</span>
            <span className="col-span-4">Descripción</span>
            <span className="col-span-2">Precio</span>
            <span className="col-span-2">Categoría</span>
            <span className="col-span-2 text-right">En Stock</span>
          </div>

          {/* Table Body */}
          {results.length === 0 ? (
            <div className="p-8 text-center text-slate-400 font-medium">No se encontraron productos.</div>
          ) : (
            results.map((product, idx) => (
              <div 
                key={product.id}
                onClick={() => {
                  addItem(product);
                  closeModal();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={clsx(
                  "grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-slate-50 cursor-pointer transition-colors last:border-0",
                  selectedIndex === idx ? "bg-brand-primary-dark text-white" : "hover:bg-slate-50 text-slate-800"
                )}
              >
                <span className={clsx("col-span-2 text-xs font-bold font-mono", selectedIndex === idx ? "text-brand-accent" : "text-brand-primary")}>
                  {product.sku.replace('-', '')}
                </span>
                <span className="col-span-4 font-bold text-sm tracking-tight">{product.name}</span>
                <span className="col-span-2 font-black text-lg">${product.price.toFixed(2)}</span>
                <span className="col-span-2 flex">
                  <span className={clsx(
                    "text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-widest",
                    selectedIndex === idx ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  )}>
                    {product.category.split(' ')[0]}
                  </span>
                </span>
                <span className="col-span-2 flex justify-end">
                  {product.status === 'critico' ? (
                    <div className="w-5 h-5 rounded-full bg-pumas-red text-white flex items-center justify-center font-bold text-xs">!</div>
                  ) : (
                    <CheckCircle2 className={clsx("w-5 h-5", selectedIndex === idx ? "text-brand-accent" : "text-brand-primary")} />
                  )}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer Hints */}
      <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center rounded-b-2xl">
        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
          <span className="bg-slate-200 px-2 rounded h-5 flex items-center">↑</span>
          <span className="bg-slate-200 px-2 rounded h-5 flex items-center">↓</span>
          <span className="tracking-widest">NAVEGAR</span>
          
          <span className="bg-slate-200 px-2 rounded h-5 flex items-center ml-4">ENT</span>
          <span className="tracking-widest">SELECCIONAR</span>
        </div>
        
        <div className="flex gap-4">
          <button onClick={closeModal} className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg text-sm transition-colors">
            Cancelar (ESC)
          </button>
          <button 
            onClick={() => {
              if (results[selectedIndex]) addItem(results[selectedIndex]);
              closeModal();
            }}
            className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-dark text-white font-black uppercase tracking-widest rounded-lg text-sm flex items-center gap-2 shadow-[0_4px_12px_rgba(0,112,26,0.2)] transition-colors"
          >
            Agregar al Carrito
            <span className="text-lg leading-none">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckoutModal() {
  const { closeModal } = useUIStore();
  const { clearCart } = useCartStore();
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Simulate payment processing / printing
    const timer = setTimeout(() => {
      setStep(2);
      clearCart();
    }, 2000);
    return () => clearTimeout(timer);
  }, [clearCart]);

  // Handle F10 continuation globally could be tricky inside modal, handling it natively here
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'F10' && step === 2) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [step, closeModal]);

  return (
    <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
      
      {step === 1 ? (
        <>
          <div className="w-24 h-24 relative mb-6">
            <div className="absolute inset-0 border-4 border-brand-primary/20 border-t-brand-primary rounded-xl animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Printer className="w-8 h-8 text-brand-primary" />
            </div>
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">Imprimiendo Comprobante</h2>
          <p className="text-sm font-medium text-slate-500 max-w-xs">
            Por favor aguarde mientras finalizamos la transacción para la Terminal 04.
          </p>
        </>
      ) : (
        <>
          <div className="w-24 h-24 mb-6 relative">
            <div className="absolute inset-0 bg-brand-primary/10 rounded-xl rotate-45 scale-90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white border-4 border-brand-primary rounded-xl flex items-center justify-center shadow-lg">
                <Printer className="w-7 h-7 text-brand-primary" />
              </div>
            </div>
          </div>

          <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-4 mb-6 text-left">
            <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 tracking-wider">CÓD. AUTORIZACIÓN</p>
              <p className="text-sm font-black text-slate-800">#PX-99283-A</p>
            </div>
          </div>

          <button 
            autoFocus
            onClick={closeModal}
            className="w-full py-4 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl shadow-[0_4px_12px_rgba(0,112,26,0.3)] transition-colors flex justify-center items-center gap-2 mb-3"
          >
            <span className="font-bold">Transacción Finalizada</span>
            <span className="border border-white/30 rounded px-1.5 py-0.5 text-[10px] font-mono">F10</span>
          </button>
          <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">
            Presione F10 para continuar
          </p>
        </>
      )}
    </div>
  );
}

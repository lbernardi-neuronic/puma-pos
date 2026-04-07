'use client';

import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { Trash2, ScanBarcode, X } from 'lucide-react';
import clsx from 'clsx';
import { Product } from '@/lib/mock-data';

export default function CartPanel() {
  const { items, getSubtotal, getTax, getTotal, discount, clearCart, removeItem } = useCartStore();
  const { openModal } = useUIStore();

  const handleCheckout = () => {
    if (items.length > 0) openModal('checkout_success');
  };

  return (
    <aside className="w-80 lg:w-[400px] bg-white h-full border-l border-slate-200 flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-10 flex-shrink-0">
      {/* Header */}
      <div className="p-6 pb-4 flex justify-between items-center border-b border-slate-100">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Venta Actual</h2>
          <div className="flex gap-2 mt-1">
            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-sm">ID: #88291</span>
            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-sm">SUCURSAL: 104</span>
          </div>
        </div>
        <button 
          onClick={clearCart}
          className="p-2 text-pumas-red hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          disabled={items.length === 0}
          title="Vaciar carrito"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
            <ScanBarcode className="w-12 h-12 opacity-20" />
            <p className="text-sm font-medium">No hay productos en la venta actual.</p>
          </div>
        ) : (
          items.map(item => (
            <div key={item.cartId} className="flex justify-between items-start group">
              <div>
                <h3 className="text-sm font-bold text-slate-800">{item.name}</h3>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  Cant.: {item.quantity}  •  ${item.price.toFixed(2)} c/u
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button 
                  onClick={() => removeItem(item.cartId)}
                  className="text-slate-300 hover:text-pumas-red hover:bg-red-50 p-1.5 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                  title="Eliminar producto"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Puma Pris / Rewards Card integration */}
      <div className="px-6 py-4">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-6 bg-brand-primary rounded flex items-center justify-center">
              <div className="w-4 h-2.5 bg-white rounded-sm opacity-90" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Puma Pris</p>
              <p className="text-[10px] text-slate-500">Escanear tarjeta socio</p>
            </div>
          </div>
          <button className="text-[10px] font-bold text-brand-primary uppercase tracking-wider hover:text-brand-primary-dark">
            Aplicar
          </button>
        </div>
      </div>

      {/* Totals & Checkout */}
      <div className="p-6 bg-slate-50 border-t border-slate-200 mt-auto">
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs font-medium text-slate-500">
            <span>Subtotal</span>
            <span>${getSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs font-medium text-slate-500">
            <span>IVA (21%)</span>
            <span>${getTax().toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-xs font-bold text-pumas-red">
              <span>Descuentos</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-end mb-6">
          <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Total a Pagar</span>
          <span className="text-5xl font-black text-slate-900 tracking-tighter">
            ${getTotal().toFixed(2)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="h-16 flex flex-col items-center justify-center bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold transition-colors">
            <span className="text-[10px] opacity-70 mb-0.5 mt-1">[F8]</span>
            <span className="text-sm">Efectivo</span>
          </button>
          <button 
            className="h-16 flex flex-col items-center justify-center bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl shadow-[0_8px_16px_rgba(0,112,26,0.2)] transition-all hover:shadow-[0_4px_12px_rgba(0,112,26,0.3)] active:scale-95 disabled:bg-slate-300 disabled:shadow-none disabled:active:scale-100 disabled:text-slate-500"
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            <span className="text-[10px] opacity-70 mb-0.5 mt-1 border border-white/30 px-1.5 rounded-sm">[F10]</span>
            <span className="text-lg font-black tracking-wide uppercase">Cobrar</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

'use client';

import { useState } from 'react';
import { Bell, Settings } from 'lucide-react';
import clsx from 'clsx';

export default function CierreDeCajaPage() {
  // Arqueo State
  const [bills, setBills] = useState({
    10000: 0,
    2000: 10, // from mock image
    1000: 125, // from mock image
    500: 0
  });

  const [cards, setCards] = useState({
    visa: 342100.50,
    mastercard: 128400.00
  });

  const [digital, setDigital] = useState({
    mercadopago: 56700.00,
    modo: 12000.00
  });

  // Derived state
  const totalEfectivo = (bills[10000] * 10000) + (bills[2000] * 2000) + (bills[1000] * 1000) + (bills[500] * 500);
  const totalTarjetas = cards.visa + cards.mastercard;
  const totalDigital = digital.mercadopago + digital.modo;
  const totalDeclarado = totalEfectivo + totalTarjetas + totalDigital;

  // System Resumen
  const ventasFuel = 1240500.50;
  const ventasShop = 312400.00;
  const descuentos = 45200.00;
  const totalEsperado = (ventasFuel + ventasShop) - descuentos;

  const diferencia = totalDeclarado - totalEsperado;

  return (
    <div className="flex-1 overflow-y-auto bg-brand-secondary h-full flex flex-col items-center py-8">
      {/* Top Header Arqueo */}
      <div className="w-full max-w-6xl px-4 flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Cierre de Turno</h1>
          <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mt-1">Arqueo Detallado de Valores</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right mr-4">
            <p className="text-[10px] font-bold text-brand-primary tracking-widest uppercase">Operario: Juan P.</p>
            <p className="text-[10px] font-bold text-slate-400">F12: ABRIR CAJA</p>
          </div>
          <button className="w-10 h-10 bg-white rounded-full flex justify-center items-center text-slate-500 shadow-sm"><Bell className="w-5 h-5"/></button>
          <button className="w-10 h-10 bg-white rounded-full flex justify-center items-center text-slate-500 shadow-sm"><Settings className="w-5 h-5"/></button>
        </div>
      </div>

      <div className="w-full max-w-6xl px-4 flex gap-6">
        
        {/* Left Column (Inputs) */}
        <div className="flex-1 space-y-6">
          
          {/* EFECTIVO PANEL */}
          <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-700/50">
            <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
              <h2 className="text-sm font-bold text-white tracking-widest uppercase flex items-center gap-2">
                💵 Efectivo (Pesos)
              </h2>
              <span className="text-xs font-medium text-slate-400">Total Declarado: ${totalEfectivo.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4 bg-slate-800/50">
              {[10000, 2000, 1000, 500].map(val => (
                <div key={val} className="bg-white rounded-xl p-4 shadow-sm flex flex-col border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Billete ${val}</span>
                    <span className="text-[10px] font-bold text-slate-400">Subtotal</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <input 
                      type="number" 
                      min="0"
                      className="w-16 focus:outline-none focus:text-brand-primary text-xl font-bold text-slate-800" 
                      value={bills[val as keyof typeof bills] || ''}
                      onChange={(e) => setBills({...bills, [val]: Number(e.target.value)})}
                      placeholder="Cant."
                    />
                    <span className="text-sm font-bold text-slate-800">${(bills[val as keyof typeof bills] * val).toLocaleString('es-AR', {minimumFractionDigits:2})}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* TARJETAS PANEL */}
            <div className="bg-white border text-slate-800 border-brand-primary rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-brand-primary px-6 py-4">
                <h2 className="text-sm font-bold text-white tracking-widest uppercase">💳 Tarjetas (Cupones)</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Visa Crédito</span>
                  <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-brand-primary-dark font-bold text-sm" value={cards.visa} readOnly />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Mastercard</span>
                  <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-brand-primary-dark font-bold text-sm" value={cards.mastercard} readOnly />
                </div>
              </div>
            </div>

            {/* QR / PRIS PANEL */}
            <div className="bg-white border text-slate-800 border-[#6b5501] rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[#8b6f00] px-6 py-4">
                <h2 className="text-sm font-bold text-white tracking-widest uppercase">📱 QR / Pris</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Mercadopago QR</span>
                  <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-brand-primary-dark font-bold text-sm" value={digital.mercadopago} readOnly />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">MODO / BNA+</span>
                  <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-brand-primary-dark font-bold text-sm" value={digital.modo} readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Resumen) */}
        <div className="w-[380px] bg-white rounded-3xl border border-brand-primary/20 shadow-xl overflow-hidden flex flex-col relative shrink-0">
          <div className="p-8 pb-4">
            <h2 className="text-xl font-black italic tracking-tighter text-slate-800 mb-8 uppercase">Resumen de Sistema</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                <span>Total Ventas Fuel</span>
                <span className="text-slate-800">${ventasFuel.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                <span>Total Ventas Shop</span>
                <span className="text-slate-800">${ventasShop.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-pumas-red">
                <span>Descuentos Aplicados</span>
                <span>- ${descuentos.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>
              </div>
            </div>
            
            <div className="my-6 border-b-2 border-dashed border-slate-200" />
            
            <div className="flex justify-between items-end mb-4">
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Total Esperado</span>
              <span className="text-2xl font-black text-slate-800">${totalEsperado.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>
            </div>
            
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Total Declarado</span>
              <span className="text-2xl font-black text-brand-primary">${totalDeclarado.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>
            </div>

            <div className={clsx("mt-8 p-4 rounded-xl border flex flex-col items-center justify-center text-center", diferencia === 0 ? "bg-brand-primary/5 border-brand-primary/20" : "bg-pumas-red/5 border-pumas-red/20")}>
               <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Diferencia</p>
               <p className={clsx("text-2xl font-black", diferencia === 0 ? "text-brand-primary" : "text-pumas-red")}>${Math.abs(diferencia).toLocaleString('es-AR', {minimumFractionDigits: 2})}</p>
               <p className="text-[9px] font-medium text-slate-400 mt-2 px-4 leading-tight">
                 {diferencia === 0 ? "La declaración coincide con las ventas registradas por el sistema." : "Existe una diferencia en caja."}
               </p>
            </div>
          </div>

          <div className="mt-auto p-6 bg-slate-50 border-t border-slate-100">
            <button className="w-full bg-brand-primary-dark text-white rounded-xl py-4 flex items-center justify-between px-6 shadow-lg shadow-brand-primary-dark/20 hover:scale-[1.02] active:scale-95 transition-all">
              <span className="font-bold tracking-widest uppercase text-sm">Confirmar Cierre</span>
              <span className="border border-white/30 text-[10px] px-1.5 py-0.5 rounded font-mono">F12</span>
            </button>
            <p className="text-center text-[9px] font-medium text-slate-400 mt-4 leading-tight">
              Al confirmar, se emitirá el reporte de cierre Z y el arqueo parcial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

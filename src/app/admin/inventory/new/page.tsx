'use client';

import { ArrowLeft, Save, Info, Image as ImageIcon, Banknote, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-10 bg-white">
      {/* Breadcrumb & Title */}
      <div className="mb-10">
        <div className="flex gap-2 text-[11px] font-bold text-slate-400 mb-2 tracking-widest uppercase">
          <Link href="/admin/inventory" className="hover:text-brand-primary transition-colors">Inventario</Link>
          <span>›</span>
          <span className="text-slate-800">Nuevo Producto</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter">Agregar Nuevo Producto</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 pb-24">
        
        {/* Left Column - Main Forms */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* General Info Card */}
          <div className="bg-white border text-slate-800 border-slate-200 rounded-2xl shadow-sm p-8">
            <h2 className="text-lg font-bold text-brand-primary-dark flex items-center gap-2 mb-6 tracking-tight">
              <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center text-white shrink-0">
                <Info className="w-4 h-4" />
              </div>
              Información General
            </h2>

            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Nombre del Producto</label>
                <input type="text" placeholder="Ej: Aceite Synthetic 5W-30 1L" className="w-full bg-slate-50 border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl px-4 py-3.5 text-slate-800 font-bold placeholder-slate-400 transition-all" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Código/SKU</label>
                  <div className="relative">
                    <input type="text" placeholder="SKU-00000" className="w-full bg-slate-50 border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl px-4 py-3.5 text-slate-800 font-bold placeholder-slate-400 transition-all uppercase font-mono" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2">
                      <HelpCircle className="w-5 h-5 text-slate-300" />
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Categoría</label>
                  <select defaultValue="" className="w-full bg-slate-50 border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl px-4 py-3.5 text-slate-800 font-bold appearance-none transition-all cursor-pointer">
                    <option value="" disabled>Seleccionar Categoría</option>
                    <option value="combustibles">Combustibles</option>
                    <option value="tienda">Tienda (Shop)</option>
                    <option value="lubricantes">Lubricantes</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Descripción</label>
                <textarea rows={4} placeholder="Detalles técnicos, especificaciones o notas adicionales..." className="w-full bg-slate-50 border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl px-4 py-3.5 text-slate-800 font-medium placeholder-slate-400 resize-none transition-all"></textarea>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory Card */}
          <div className="bg-white border-l-4 text-slate-800 border-l-brand-primary border-slate-200 rounded-2xl shadow-sm p-8">
            <h2 className="text-lg font-bold text-brand-primary-dark flex items-center gap-2 mb-6 tracking-tight">
              <Banknote className="w-6 h-6 text-brand-primary" />
              Precio e Inventario
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Precio de Venta ($)</label>
                <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400 text-xl">$</span>
                   <input type="number" placeholder="0.00" className="w-full bg-slate-50 border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl pl-10 pr-4 py-3.5 text-slate-800 font-black text-xl transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Stock Inicial</label>
                <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2">
                      <HelpCircle className="w-5 h-5 text-slate-400" />
                   </span>
                   <input type="number" placeholder="Cant." className="w-full bg-slate-50 border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary/50 rounded-xl pl-12 pr-4 py-3.5 text-slate-800 font-black text-xl transition-all" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Image & Status */}
        <div className="w-full lg:w-[360px] flex flex-col gap-6 shrink-0">
          
          <div className="bg-white border text-slate-800 border-slate-200 rounded-2xl shadow-sm p-8">
            <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-4">Imagen del Producto</p>
            
            <button className="w-full h-56 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-brand-primary hover:border-brand-primary hover:bg-brand-primary/5 transition-all cursor-pointer group">
              <ImageIcon className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-sm">Subir imagen</span>
            </button>
          </div>

          <div className="bg-white border text-slate-800 border-slate-200 rounded-2xl shadow-sm p-6 flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-800">Producto Activo</p>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5 max-w-[150px]">Disponible para la venta</p>
            </div>
            
            {/* Toggle Switch */}
            <div className="w-14 h-8 bg-brand-primary rounded-full flex items-center p-1 cursor-pointer">
              <div className="bg-white w-6 h-6 rounded-full shadow-sm ml-auto" />
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex justify-between items-center text-xs font-medium text-slate-500 mb-2">
              <span>Creado por:</span>
              <span className="font-bold text-slate-800">Admin Puma</span>
            </div>
            <div className="flex justify-between items-center text-xs font-medium text-slate-500">
              <span>Fecha:</span>
              <span className="font-bold text-slate-800">14 Oct 2025, 15:42</span>
            </div>
          </div>

        </div>

      </div>

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center z-10 -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 gap-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span className="bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded text-slate-600">F10</span>
            Guardar
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
             <span className="bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded text-slate-600">ESC</span>
            Volver
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/admin/inventory" className="px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors flex items-center gap-2 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
            Cancelar
          </Link>
          <button className="px-6 py-3.5 bg-brand-primary-dark hover:bg-brand-primary text-white font-bold rounded-xl transition-all shadow-lg flex items-center gap-2">
            <Save className="w-5 h-5" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}

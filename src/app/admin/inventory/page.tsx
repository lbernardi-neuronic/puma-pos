'use client';

import { mockProducts } from '@/lib/mock-data';
import { Plus, TrendingDown, Layers, Box, Trash2 } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';

export default function InventoryPage() {
  const [products, setProducts] = useState(mockProducts);
  const [filter, setFilter] = useState('Todos');
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  // BUG-17 fix: Mapear labels de filtro a categorías reales
  const filterMap: Record<string, string[]> = {
    'Todos': [],
    'Combustibles': ['Combustibles'],
    'Tienda (Shop)': ['Café y Bebidas Calientes', 'Snacks Frescos', 'Bebidas', 'Merchandising'],
    'Lubricantes': ['Lubricantes'],
  };

  const filteredProducts = filter === 'Todos'
    ? products
    : products.filter(p => filterMap[filter]?.includes(p.category));

  // Mocks Stats
  const valorInventario = 4280450.00;
  const stockCriticoCount = products.filter(p => p.status === 'critico' || p.status === 'stock_bajo').length;
  
  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete));
      setProductToDelete(null);
    }
  };
  
  return (
    <div className="flex-1 overflow-y-auto px-12 py-10 bg-white">
      
      {/* Header & Main Call to Actions */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Inventario de Productos</h1>
          <p className="text-sm font-medium text-slate-500">Control de existencias y precios en tiempo real.</p>
        </div>
        <Link 
          href="/admin/inventory/new"
          className="bg-brand-primary-dark hover:bg-brand-primary text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-brand-primary/20 transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Nuevo Producto
        </Link>
      </div>

      <div className="flex gap-6 mb-10">
        {/* Filters Panel */}
        <div className="flex-1 bg-brand-secondary rounded-2xl flex items-center p-2 gap-2 h-[88px]">
          {['Todos', 'Combustibles', 'Tienda (Shop)', 'Lubricantes'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={clsx(
                "px-8 py-3.5 rounded-xl font-bold text-sm transition-all",
                filter === cat 
                  ? "bg-brand-primary-dark text-white shadow-sm" 
                  : "text-slate-600 hover:bg-slate-200/50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Global Value Card */}
        <div className="bg-brand-primary-dark rounded-2xl p-6 w-[360px] text-white flex flex-col justify-center relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            <p className="text-[10px] font-bold tracking-widest uppercase opacity-80 mb-1">Valor de Inventario</p>
            <p className="text-3xl font-black tracking-tight">${valorInventario.toLocaleString('es-AR', {minimumFractionDigits: 2})}</p>
          </div>
          {/* Decorative faint icon */}
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Box className="w-32 h-32" />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-10">
        {/* Table Headers */}
        <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 tracking-widest uppercase items-center">
          <div className="col-span-2">Código</div>
          <div className="col-span-3">Descripción</div>
          <div className="col-span-2">Categoría</div>
          <div className="col-span-2">Precio</div>
          <div className="col-span-1 text-center">Stock</div>
          <div className="col-span-1">Estado</div>
          <div className="col-span-1 text-center"></div>
        </div>

        {/* Table Rows - now uses filteredProducts */}
        <div className="divide-y divide-slate-100">
          {filteredProducts.map((product) => (
            <div key={product.id} className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-50 transition-colors group">
              <div className="col-span-2 flex flex-col">
                <span className="text-xs font-bold font-mono text-slate-500">{product.sku}</span>
              </div>
              <div className="col-span-3 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                  {product.image ? (
                     <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                  ) : (
                    <Box className="w-5 h-5 text-brand-primary/50" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 leading-tight">{product.name}</p>
                  <p className="text-[10px] font-medium text-slate-400 mt-0.5">Ref. {product.id}</p>
                </div>
              </div>
              <div className="col-span-2">
                <span className="inline-flex bg-brand-secondary text-brand-primary-dark font-bold text-[10px] px-2.5 py-1 rounded-full border border-brand-primary/10 tracking-wide uppercase">
                  {product.category}
                </span>
              </div>
              <div className="col-span-2 text-sm font-black text-slate-800">
                ${product.price.toLocaleString('es-AR', {minimumFractionDigits: 2})}
              </div>
              <div className="col-span-1 flex flex-col text-center">
                <span className="text-sm font-bold text-slate-800">{product.stock.toLocaleString('es-AR')}</span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">Un</span>
              </div>
              <div className="col-span-1 flex items-center gap-2">
                <div className={clsx("w-2 h-2 rounded-full", product.status === 'en_stock' ? "bg-brand-primary" : "bg-pumas-red")} />
                <span className={clsx("text-xs font-bold", product.status === 'en_stock' ? "text-brand-primary" : "text-pumas-red")}>
                  {product.status === 'en_stock' ? 'En Stock' : 'Stock Bajo'}
                </span>
              </div>
              <div className="col-span-1 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setProductToDelete(product.id)}
                  className="p-2 text-slate-400 hover:text-pumas-red hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Eliminar producto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Footers */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-brand-secondary rounded-2xl p-6 relative overflow-hidden">
           <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
              <TrendingDown className="w-6 h-6 text-slate-700" />
           </div>
           <p className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">Stock Crítico</p>
           <p className="text-3xl font-black text-slate-900 tracking-tighter mt-1">{stockCriticoCount}</p>
           <span className="absolute top-6 right-6 text-xs font-bold text-pumas-red">-3 Items</span>
        </div>
        
        <div className="bg-brand-secondary rounded-2xl p-6">
           <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
              <Layers className="w-6 h-6 text-[#8b6f00]" />
           </div>
           <p className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">Categorías Activas</p>
           <p className="text-3xl font-black text-slate-900 tracking-tighter mt-1">8</p>
        </div>

        <div className="bg-brand-secondary rounded-2xl p-6">
           <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
              <Box className="w-6 h-6 text-brand-primary-dark" />
           </div>
           <p className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">Productos Totales</p>
           <p className="text-3xl font-black text-slate-900 tracking-tighter mt-1">1,248</p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-pumas-red">
              <Trash2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-2">¿Eliminar producto?</h3>
            <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">
              Esta acción no se puede deshacer. El producto será eliminado permanentemente de tu inventario.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-4 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-4 px-4 bg-pumas-red hover:bg-[#b71c1c] text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

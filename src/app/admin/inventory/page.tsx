'use client';

import { mockProducts } from '@/lib/mock-data';
import { Plus, TrendingDown, Layers, Box, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { useState, useMemo } from 'react';
import ConfirmDeleteModal from '@/components/admin/ConfirmDeleteModal';

function SafeAvatar({ src, alt }: { src?: string; alt: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return <Box className="w-5 h-5 text-brand-primary/50" aria-hidden="true" />;
  }

  return (
    <Image 
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="40px"
      onError={() => setError(true)}
    />
  );
}

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

  // Stats dinámicas
  const valorInventario = useMemo(() => products.reduce((acc, p) => acc + (p.price * p.stock), 0), [products]);
  const stockCriticoCount = products.filter(p => p.status === 'critico' || p.status === 'stock_bajo').length;
  const categoriesCount = useMemo(() => new Set(products.map(p => p.category)).size, [products]);
  const totalProducts = products.length;
  
  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete));
      setProductToDelete(null);
    }
  };
  
  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-10 bg-white">
      
      {/* Header & Main Call to Actions */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 lg:mb-10 gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-1 sm:mb-2">Inventario de Productos</h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">Control de existencias y precios en tiempo real.</p>
        </div>
        <Link 
          href="/admin/inventory/new"
          className="bg-brand-primary-dark hover:bg-brand-primary text-white font-bold py-3 px-5 sm:px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-brand-primary/20 transition-all active:scale-95 cursor-pointer w-full sm:w-auto justify-center sm:justify-start shrink-0"
        >
          <Plus className="w-5 h-5" />
          Nuevo Producto
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-6 lg:mb-10">
        {/* Filters Panel */}
        <div className="flex-1 bg-brand-secondary rounded-2xl flex flex-wrap items-center p-2 gap-2">
          {['Todos', 'Combustibles', 'Tienda (Shop)', 'Lubricantes'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={clsx(
                "px-4 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex-1 sm:flex-none",
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
        <div className="bg-brand-primary-dark rounded-2xl p-5 lg:p-6 lg:w-[360px] text-white flex flex-col justify-center relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            <p className="text-[10px] font-bold tracking-widest uppercase opacity-80 mb-1">Valor de Inventario</p>
            <p className="text-2xl lg:text-3xl font-black tracking-tight">${valorInventario.toLocaleString('es-AR', {minimumFractionDigits: 2})}</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Box className="w-32 h-32" />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-6 lg:mb-10 overflow-x-auto">
        {/* Table Headers */}
        <div className="grid grid-cols-12 gap-4 px-4 sm:px-8 py-4 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 tracking-widest uppercase items-center min-w-[700px]">
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
            <div key={product.id} className="grid grid-cols-12 gap-4 px-4 sm:px-8 py-5 items-center hover:bg-slate-50 transition-colors group min-w-[700px]">
              <div className="col-span-2 flex flex-col">
                <span className="text-xs font-bold font-mono text-slate-500">{product.sku}</span>
              </div>
              <div className="col-span-3 flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                  <SafeAvatar src={product.image} alt={product.name} />
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
                  aria-label={`Eliminar ${product.name}`}
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Footers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8">
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
           <p className="text-3xl font-black text-slate-900 tracking-tighter mt-1">{categoriesCount}</p>
        </div>

        <div className="bg-brand-secondary rounded-2xl p-6">
           <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
              <Box className="w-6 h-6 text-brand-primary-dark" />
           </div>
           <p className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">Productos Totales</p>
           <p className="text-3xl font-black text-slate-900 tracking-tighter mt-1">{totalProducts.toLocaleString()}</p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={confirmDelete}
        title="¿Eliminar producto?"
        description="Esta acción no se puede deshacer. El producto será eliminado permanentemente de tu inventario."
      />

    </div>
  );
}

'use client';

import { useState } from 'react';
import Header from '@/components/pos/Header';
import { mockProducts, Category, Product, mockPumps } from '@/lib/mock-data';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import clsx from 'clsx';

const categories: Category[] = ['Café y Bebidas Calientes', 'Snacks Frescos', 'Bebidas', 'Lubricantes'];

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Café y Bebidas Calientes');
  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts = mockProducts.filter(p => p.category === activeCategory && p.status !== 'critico');

  return (
    <div className="flex-1 flex flex-col h-full bg-brand-secondary overflow-hidden">
      <Header />
      
      {/* Categories Bar */}
      <div className="flex gap-3 px-8 py-6 flex-shrink-0 hide-scrollbar overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={clsx(
              "px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all shadow-sm border",
              activeCategory === cat
                ? "bg-brand-primary text-white border-brand-primary-dark"
                : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200 hover:border-slate-300"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Products */}
      <div className="flex-1 overflow-y-auto px-8 pb-32">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => addItem(product)}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-slate-100 flex flex-col group active:scale-95"
            >
              <div className="aspect-square bg-slate-50 rounded-xl mb-4 overflow-hidden relative">
                {/* next/image for production performance */}
                <Image
                  src={product.image || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=300&q=80'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {product.tags && product.tags.length > 0 && (
                  <div className="absolute top-2 right-2 bg-brand-primary-dark/90 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-1 rounded">
                    {product.tags[0]}
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-slate-800 text-sm leading-tight mb-2 group-hover:text-brand-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-brand-primary font-black text-lg">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Grid: Pumps - sticky within the scrollable area */}
      <div className="sticky bottom-0 bg-gradient-to-t from-brand-secondary via-brand-secondary to-transparent pt-6 pb-6 px-8">
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
          {mockPumps.map((pump) => (
            <div 
              key={pump.id} 
              className={clsx(
                "bg-white rounded-xl border p-4 shadow-sm flex flex-col items-center justify-center transition-colors cursor-pointer",
                pump.status === 'Libre' ? "border-b-4 border-brand-primary" : 
                pump.status === 'Despachando' ? "border-b-4 border-pumas-red" : 
                pump.status === 'Listo' ? "border-b-4 border-amber-400" :
                "border-b-4 border-slate-300"
              )}
            >
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{pump.name}</span>
              <span className={clsx(
                "text-2xl font-black tracking-tight my-0.5",
                pump.status === 'Libre' ? "text-brand-primary" : 
                pump.status === 'Despachando' ? "text-pumas-red" : 
                pump.status === 'Listo' ? "text-amber-600" :
                "text-slate-400"
              )}>
                ${pump.amount.toFixed(2)}
              </span>
              <span className="text-[10px] font-bold text-slate-400">{pump.status}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

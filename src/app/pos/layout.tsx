'use client'; // adding 'use client' since we are importing Zustand

import { ReactNode } from 'react';
import Sidebar from '@/components/pos/Sidebar';
import CartPanel from '@/components/pos/CartPanel';
import POSModals from '@/components/pos/POSModals';
import { useUIStore } from '@/store/useUIStore';
import { Menu, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function POSLayout({ children }: { children: ReactNode }) {
  const { isSidebarOpen, isCartOpen, toggleSidebar, toggleCart, closeDrawers } = useUIStore();
  const cartItemsCount = useCartStore(state => state.items.length);

  return (
    <div className="flex h-screen w-full bg-brand-secondary overflow-hidden text-foreground relative">
      <POSModals />
      
      {/* Mobile Backdrop */}
      {(isSidebarOpen || isCartOpen) && (
        <div 
          className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={closeDrawers}
        />
      )}
      
      {/* Sidebar Navigation - Responsive Drawer */}
      <div className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-brand-secondary w-full lg:w-auto">
        {/* Mobile Header Buttons (Visible only on < lg) */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
          <button onClick={toggleSidebar} className="p-2 bg-slate-100 rounded-lg">
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
          <div className="font-black italic text-brand-primary-dark">PUMA SHOP</div>
          <button onClick={toggleCart} className="p-2 bg-slate-100 rounded-lg relative">
            <ShoppingCart className="w-6 h-6 text-slate-700" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pumas-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
        
        {children}
      </div>

      {/* Right Cart / Active Sale Panel - Responsive Drawer */}
      <div className={`fixed inset-y-0 right-0 z-40 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <CartPanel />
      </div>
    </div>
  );
}

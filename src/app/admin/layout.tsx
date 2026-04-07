import { ReactNode } from 'react';
import { Metadata } from 'next';
import AdminSidebar from '@/components/admin/Sidebar';

export const metadata: Metadata = {
  title: 'Puma Shop POS | Panel de Administración',
  description: 'Gestión de inventario, proveedores y configuraciones.',
};
import { Bell, Settings } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-white overflow-hidden text-slate-800">
      
      {/* Sidebar de Administración */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-white relative min-w-0">
        {/* Administration Topbar */}
        <header className="h-16 lg:h-20 w-full flex items-center justify-between px-4 pl-14 lg:pl-8 lg:px-8 border-b border-slate-200 bg-white flex-shrink-0 z-10 gap-4">
          <div className="hidden sm:block">
            <h2 className="text-lg font-black text-brand-primary-dark tracking-tight">Puma Shop POS: Gestión</h2>
          </div>

          <div className="flex items-center gap-3 lg:gap-6 flex-1 sm:flex-none justify-end">
            {/* Search Topbar */}
            <div className="relative w-full max-w-[240px] lg:max-w-[384px] hidden md:block">
              <input 
                type="text" 
                placeholder="Buscar producto..." 
                className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full py-2.5 px-6 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-slate-700 placeholder-slate-400"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            </div>

            <div className="w-px h-8 bg-slate-200 mx-1 hidden lg:block" />

            <button className="text-slate-400 hover:text-slate-600 transition-colors hidden sm:block">
              <Bell className="w-5 h-5" />
            </button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors hidden sm:block">
              <Settings className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 ml-1">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-xs font-black text-slate-800 tracking-tight">Admin Puma</span>
                <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">Supervisor</span>
              </div>
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-brand-primary-dark border border-brand-primary/20 overflow-hidden shrink-0 flex items-center justify-center text-white font-bold text-sm">
                AP
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        {children}
        
      </div>
    </div>
  );
}

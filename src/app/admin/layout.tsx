import { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/Sidebar';
import { Bell, Settings } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-white overflow-hidden text-slate-800">
      
      {/* Sidebar de Administración */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-white relative">
        {/* Administation Topbar */}
        <header className="h-20 w-full flex items-center justify-between px-8 border-b border-slate-200 bg-white flex-shrink-0 z-10">
          <div>
            <h2 className="text-lg font-black text-brand-primary-dark tracking-tight">Puma Shop POS: Gestión</h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Search Topbar */}
            <div className="relative w-96">
              <input 
                type="text" 
                placeholder="Buscar producto por nombre o SKU..." 
                className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full py-2.5 px-6 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-slate-700 placeholder-slate-400"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            </div>

            <div className="w-px h-8 bg-slate-200 mx-2" />

            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 ml-2">
              <div className="flex flex-col items-end">
                <span className="text-xs font-black text-slate-800 tracking-tight">Admin Puma</span>
                <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">Supervisor</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
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

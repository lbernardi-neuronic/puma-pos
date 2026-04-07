'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Tags, Truck, HelpCircle, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import clsx from 'clsx';

const menuItems = [
  { href: '/admin/inventory', label: 'Inventario', icon: Package },
  { href: '/admin/categories', label: 'Categorías', icon: Tags },
  { href: '/admin/suppliers', label: 'Proveedores', icon: Truck },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
    document.cookie = 'puma-auth-token=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <aside className="w-[280px] bg-brand-secondary border-r border-slate-200 flex flex-col h-full flex-shrink-0">
      {/* Brand Header */}
      <div className="p-8 mb-4">
        <h1 className="text-xl font-black text-brand-primary-dark tracking-tighter">Administración</h1>
        <p className="text-xs font-bold text-slate-500 tracking-widest mt-1">BACKOFFICE V1.0</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 w-full flex flex-col px-4 gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-4 px-6 py-4 rounded-xl transition-colors font-bold",
                isActive 
                  ? "bg-white text-brand-primary-dark shadow-sm border border-slate-100" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <Icon className={clsx("w-5 h-5", isActive ? "text-brand-primary" : "text-slate-400")} strokeWidth={2.5} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Settings */}
      <div className="w-full flex flex-col p-4 border-t border-slate-200 gap-2">
        <button className="flex items-center gap-4 px-6 py-4 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors font-bold text-sm">
          <HelpCircle className="w-5 h-5 text-slate-400" />
          <span>Ayuda</span>
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-6 py-4 bg-pumas-red hover:bg-[#b71c1c] text-white rounded-xl transition-colors font-bold text-sm shadow-sm"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}

'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { Fuel, ShoppingBag, Settings, Clock, BarChart3, LogOut, User } from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
  { href: '/pos/playa', label: 'Playa', icon: Fuel },
  { href: '/pos', label: 'Tienda', icon: ShoppingBag },
  { href: '/pos/servicios', label: 'Servicios', icon: Settings },
  { href: '/pos/historial', label: 'Historial', icon: Clock },
  { href: '/pos/reportes', label: 'Reportes', icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
    document.cookie = 'puma-auth-token=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <aside className="w-24 lg:w-28 bg-brand-secondary border-r border-slate-200 flex flex-col items-center py-6 h-full flex-shrink-0 z-10">
      {/* Brand Logo */}
      <div className="mb-10 font-bold text-center">
        <div className="text-xl tracking-tighter text-brand-primary-dark uppercase">PUMA</div>
        <div className="text-xs text-slate-500 font-medium tracking-widest uppercase mt-0.5">POS</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 w-full gap-4 flex flex-col items-center">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "group flex flex-col items-center justify-center w-20 h-20 rounded-xl transition-all duration-200 relative",
                isActive 
                  ? "bg-white text-brand-primary font-bold shadow-sm border border-slate-100" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              )}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-12 bg-brand-primary rounded-r-md" />
              )}
              <Icon 
                className={clsx(
                  "w-7 h-7 mb-1.5 transition-transform duration-200",
                  isActive ? "text-brand-primary" : "text-slate-400 group-hover:scale-110"
                )} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User / Terminal Status */}
      <div className="mt-auto w-full flex flex-col items-center pt-6 border-t border-slate-200">
        <div className="text-[10px] font-bold text-slate-800">Terminal 04</div>
        <div className="text-[9px] font-bold text-brand-primary mb-3">ACTIVO</div>
        <button 
          onClick={handleLogout}
          title="Cerrar sesión"
          className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-pumas-red hover:text-white transition-colors shadow-sm"
        >
          <LogOut className="w-5 h-5 ml-1" />
        </button>
      </div>
    </aside>
  );
}

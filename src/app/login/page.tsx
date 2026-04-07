'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const login = useAuthStore(state => state.login);
  const router = useRouter();
  
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: SECURITY - Mover autenticación real a un backend seguro.
    // Los PINs están hardcodeados para propósito de MVP/Prototipo.
    // Además, las cookies deberían configurarse como httpOnly y secure desde la API.
    if (pin === '1234') { // Mock admin
      login('Admin Puma', 'admin');
      document.cookie = "puma-auth-token=mock-token-admin; path=/";
      router.push('/admin/inventory');
    } else if (pin === '0000') { // Mock cajero
      login('Juan P.', 'cajero', 'Terminal 04');
      document.cookie = "puma-auth-token=mock-token-cajero; path=/";
      router.push('/pos');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-brand-secondary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-center text-4xl font-black italic tracking-tighter text-brand-primary-dark uppercase">
          Puma Shop
        </h2>
        <p className="mt-2 text-center text-sm font-bold text-slate-500 tracking-widest uppercase">
          Acceso al Sistema
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-3xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
               <label htmlFor="pin" className="block text-[11px] font-bold text-slate-500 mb-2 tracking-widest uppercase">
                 PIN de Empleado
               </label>
               <input
                 id="pin"
                 name="pin"
                 type="password"
                 autoComplete="off"
                 required
                 value={pin}
                 onChange={(e) => setPin(e.target.value)}
                 className={`appearance-none block w-full px-4 py-4 border rounded-xl shadow-sm placeholder-slate-400 focus:outline-none sm:text-lg text-center font-mono tracking-[0.5em] transition-all ${error ? 'border-pumas-red' : 'border-slate-200 focus:ring-brand-primary focus:border-brand-primary'}`}
                 placeholder="****"
               />
               {error && <p className="mt-2 text-xs font-bold text-pumas-red text-center">PIN Incorrecto</p>}
            </div>

            <div className="flex items-center justify-between mt-4 mb-2">
               <div className="text-xs text-slate-500 font-medium text-center w-full">
                  PIN Demo: <span className="font-bold text-slate-800">1234</span> (Admin) o <span className="font-bold text-slate-800">0000</span> (Cajero)
               </div>
            </div>

            <div>
               <button
                 type="submit"
                 className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-primary/20 text-sm font-black text-white uppercase tracking-widest bg-brand-primary hover:bg-brand-primary-dark transition-all focus:outline-none"
               >
                 Ingresar al Sistema
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

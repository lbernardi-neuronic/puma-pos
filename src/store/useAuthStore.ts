import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'admin' | 'cajero';

interface User {
  id: string;
  name: string;
  role: Role;
  terminalId?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string, role: Role, terminalId?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (name, role, terminalId) => set({ 
        user: { id: Date.now().toString(), name, role, terminalId }, 
        isAuthenticated: true 
      }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'puma-auth-storage',
    }
  )
);

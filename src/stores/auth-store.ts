import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  email: string;
  permissions: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async credentials => {
        set({ isLoading: true });

        // 模拟登录请求
        await new Promise(resolve => setTimeout(resolve, 1000));

        set({
          user: {
            id: '1',
            username: credentials.username,
            email: 'admin@example.com',
            permissions: ['dashboard:view', 'user:view', 'user:edit'],
          },
          isAuthenticated: true,
          isLoading: false,
        });
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

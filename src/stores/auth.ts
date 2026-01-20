// src/stores/auth.ts
import { AuthStore, User } from '@/types/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 模拟登录API
const mockLogin = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'password') {
        resolve({
          user: {
            id: '1',
            name: '管理员',
            email: 'admin@example.com',
            role: 'admin',
          },
          token: 'mock-jwt-token',
        });
      } else {
        reject(new Error('用户名或密码错误'));
      }
    }, 2000);
  });
};

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      // 初始状态
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { user, token } = await mockLogin(email, password);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

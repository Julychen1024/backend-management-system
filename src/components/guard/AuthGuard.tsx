import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuthStore } from '@/stores/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiresAuth = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (isLoading) return;

    if (requiresAuth && !isAuthenticated) {
      // 重定向到登录页，并携带返回路径
      void navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`, {
        replace: true,
      });
    }

    if (!requiresAuth && isAuthenticated && location.pathname === '/login') {
      // 已登录用户访问登录页，重定向到首页
      void navigate('/', { replace: true });
    }
  }, [isAuthenticated, isLoading, requiresAuth, navigate, location]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;

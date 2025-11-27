import { Suspense } from 'react';
import { Routes, Route } from 'react-router';
import type { RouteItem } from '@/types/router';
import AuthGuard from '@/components/guard/AuthGuard';
import React from 'react';

interface RouterRendererProps {
  routes: RouteItem[];
}

const RouterRenderer: React.FC<RouterRendererProps> = ({ routes }) => {
  return (
    <Routes>
      {routes.map(route => {
        const Layout = route.layout ?? React.Fragment;
        const PageComponent = route.component;
        const { requiresAuth = false } = route.meta ?? {};

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AuthGuard requiresAuth={requiresAuth}>
                <Layout>
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                      </div>
                    }
                  >
                    <PageComponent />
                  </Suspense>
                </Layout>
              </AuthGuard>
            }
          />
        );
      })}
    </Routes>
  );
};

export default RouterRenderer;

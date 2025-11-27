import { useLocation } from 'react-router';

export const useRouteMatch = (path?: string) => {
  const location = useLocation();
  if (!path) return false;
  return location.pathname === path || location.pathname.startsWith(`${path}/`);
};

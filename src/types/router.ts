import { RouteObject } from 'react-router';

export interface RouteMeta {
  title?: string;
  requiresAuth?: boolean;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export type AppRoute = RouteObject & {
  meta?: RouteMeta;
  children?: AppRoute[];
};

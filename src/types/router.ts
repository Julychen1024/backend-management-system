export interface RouteItem {
  path: string;
  component: React.ComponentType;
  layout?: React.ComponentType;
  meta?: {
    title?: string;
    requiresAuth?: boolean;
  };
}

export interface RouterConfig {
  routes: RouteItem[];
}

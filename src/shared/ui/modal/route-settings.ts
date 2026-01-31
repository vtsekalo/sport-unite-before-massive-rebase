import { ROUTES } from '@shared/lib';

export interface RouteConfig {
  bgcolor?: string;
  justifyContent?: string;
  pointerEvents?: string;
  backdropFilter?: string;
  height?: string | { xs: string; md: string };
  width?: string;
}

export const ROUTE_SETTINGS: Record<string, RouteConfig> = {
  [ROUTES.EVENT.DETAIL('')]: {
    bgcolor: 'transparent',
    justifyContent: 'start',
    pointerEvents: 'none',
    backdropFilter: 'none',
    width: 'auto',
    height: { xs: '100%', md: 'auto' },
  },
};

import { ROUTES } from '@shared/lib';

export interface RouteConfig {
  bgcolor?: string | { xs: string; md: string };
  justifyContent?: string;
  pointerEvents?: string;
  backdropFilter?: string;
  height?: string | { xs: string; md: string };
  width?: string | { xs: string; md: string };
  alignItems?: string;
  top?: number | string;
  left?: number | string | { xs: string; md: string };
  borderRadius?: string;
}

export const ROUTE_SETTINGS: Record<string, RouteConfig> = {
  [ROUTES.EVENT.CREATE]: {},
  [ROUTES.EVENT.COPY('')]: {},
  [ROUTES.EVENT.DETAIL('')]: {
    bgcolor: { xs: 'rgba(54, 119, 255, 0.6)', md: 'transparent' },
    justifyContent: 'start',
    pointerEvents: 'none',
    backdropFilter: 'none',
    alignItems: 'start',
    width: { xs: '100%', md: 'auto' },
    height: { xs: '100%', md: 'auto' },
  },
  [ROUTES.LIST]: {
    bgcolor: { xs: 'rgba(54, 119, 255, 0.6)', md: 'transparent' },
    pointerEvents: 'none',
    backdropFilter: 'none',
    alignItems: 'start',
    width: { xs: '100%', md: 'auto' },
    height: { xs: '100%', md: 'auto' },
  },
};

import { FC, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { Box } from '@mui/material';

import { ROUTE_SETTINGS } from './route-settings';

interface PageModalProps {
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
}

export const PageModal: FC<PageModalProps> = ({ open, children }) => {
  const { pathname } = useLocation();

  if (!open) return null;

  let config = ROUTE_SETTINGS[pathname];

  if (!config) {
    const prefixKey = Object.keys(ROUTE_SETTINGS).find(
      (key) => key !== '/' && pathname.startsWith(key),
    );
    if (prefixKey) config = ROUTE_SETTINGS[prefixKey];
  }

  const bgcolor = config?.bgcolor || 'rgba(54, 119, 255, 0.6)';
  const justifyContent = config?.justifyContent || 'center';
  const pointerEvents = config?.pointerEvents || 'default';
  const backdropFilter = config?.pointerEvents || 'blur(4px)';
  const height = config?.height || '100%';
  const width = config?.width || '100%';

  return (
    <Box
      position='absolute'
      top={0}
      zIndex={10}
      display='flex'
      alignItems='center'
      justifyContent={{ xs: 'center', md: justifyContent }}
      bgcolor={bgcolor}
      left={{
        xs: 'none',
        md: 0,
      }}
      px={{
        md: '80px',
      }}
      pt={{
        xs: '88px',
        md: '136px',
      }}
      pb={{
        xs: '88px',
        md: '32px',
      }}
      sx={{
        pointerEvents: pointerEvents,
        '& > *': {
          pointerEvents: 'auto',
        },
        backdropFilter: backdropFilter,
        width: width,
        height: height,
        WebkitBackdropFilter: backdropFilter,
      }}
    >
      {children}
    </Box>
  );
};

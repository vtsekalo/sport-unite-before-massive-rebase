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

  return (
    <Box
      position='absolute'
      top={0}
      left={0}
      width='100%'
      height='100%'
      zIndex={10}
      display='flex'
      alignItems='center'
      justifyContent={{ xs: 'center', md: justifyContent }}
      bgcolor={bgcolor}
      px={{
        xs: '16px',
        md: '100px',
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
        WebkitBackdropFilter: backdropFilter,
      }}
    >
      {children}
    </Box>
  );
};

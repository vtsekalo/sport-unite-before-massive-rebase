import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';

import { ReactKeycloakProvider } from '@react-keycloak/web';

import keycloak from './Keycloak';

export const App = () => {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <StrictMode>
        <BrowserRouter>
        <></>
        </BrowserRouter>
      </StrictMode>
    </ReactKeycloakProvider>
  );
};

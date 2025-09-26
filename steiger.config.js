import { defineConfig } from 'steiger';

import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'fsd/public-api': 'error',
      'fsd/insignificant-slice': 'error',
      'fsd/no-ui-in-app': 'off',
      'fsd/no-public-api-sidestep': 'error',
    },
  },
]);
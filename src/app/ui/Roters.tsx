import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { TestPage } from '@pages/test-page/ui/test-page';

export const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<TestPage />} />
    </Routes>
  );
};

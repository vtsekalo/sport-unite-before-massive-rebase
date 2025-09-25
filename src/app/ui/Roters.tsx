import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '@layout/main';

import { TestPage } from '@pages/test-page';

export const Routers: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<>Main</>} />
        {/* Сюда встраивать новые страницы */}
      </Route>
      <Route path='/testPage' element={<TestPage />} />
    </Routes>
  );
};

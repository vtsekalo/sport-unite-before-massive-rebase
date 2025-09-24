import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

const TestPageLazy = React.lazy(() =>
  import('@pages/test-page/ui/test-page').then((module) => ({
    default: module.TestPage,
  })),
);

export const Routers: React.FC = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            Перейди на <Link to='/testPage'>тестовую страницу</Link>
          </>
        }
      />
      <Route path='/testPage' element={<TestPageLazy />} />
    </Routes>
  );
};

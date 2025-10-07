import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '@layout/main';

import { TestPage } from '@pages/test-page';

export const Routers: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<>Main</>} />
        <Route path='/map' element={<>Карта</>} />
        <Route path='/messages' element={<>Сообщения</>} />
        <Route path='/addevent' element={<>Добавить ивент</>} />
        <Route path='/notifications' element={<>Уведомления</>} />
        <Route path='/profile' element={<>Профиль или Войти в аккаунт</>} />
      </Route>
      <Route path='/testPage' element={<TestPage />} />
    </Routes>
  );
};

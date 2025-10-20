import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '@layout/main';

import { TestPage } from '@pages/test-page';

export const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='messages' element={<>Сообщения</>} />
        <Route path='addevent' element={<>Добавить ивент</>} />
        <Route path='notifications' element={<>Уведомления</>} />
        <Route path='profile' element={<>Профиль или Войти в аккаунт</>} />
        <Route path='list' element={<>Список событий</>} />
      </Route>
      <Route path='/testPage' element={<TestPage />} />
    </Routes>
  );
};

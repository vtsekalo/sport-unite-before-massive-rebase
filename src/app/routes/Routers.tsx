import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '@layout/main';

import { AuthPage } from '@pages/auth';
import { Chat } from '@pages/chat';
import { Chats } from '@pages/chats';
import { MyEvents } from '@pages/my-events';
import { ProfilePage } from '@pages/profile';
import { RegistrationPage } from '@pages/registration';
import { TestPage } from '@pages/test-page';
import { EventEditModal } from '@widgets/event';
import { SendEmail } from '@widgets/send-email';

export const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='chats' element={<Chats />} />
        <Route path='chats/:id' element={<Chat />} />
        <Route path='addevent' element={<>Добавить ивент</>} />
        <Route path='notifications' element={<>Уведомления</>} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='/events/:eventId' element={<EventEditModal />} />
        <Route path='my-events' element={<MyEvents />} />
        <Route path='list' element={<>Список событий</>} />
        <Route path='auth' element={<AuthPage />} />
        <Route path='registration' element={<RegistrationPage />} />
        <Route path='send-email' element={<SendEmail />} />
      </Route>
      <Route path='/testPage' element={<TestPage />} />
    </Routes>
  );
};

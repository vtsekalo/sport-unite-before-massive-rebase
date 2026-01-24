import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '@layout/main';

import { ModalWrapper } from '@entities/modal-wrapper';
import { AuthPage } from '@pages/auth';
import { Chat } from '@pages/chat';
import { Chats } from '@pages/chats';
import { MyEvents } from '@pages/my-events';
import { NotFoundPage } from '@pages/not-found-page';
import { Notifications } from '@pages/notifications';
import { ProfilePage } from '@pages/profile';
import { RegistrationPage } from '@pages/registration';
import { TestPage } from '@pages/test-page';
import { DeletionGuard, ROUTES } from '@shared/lib';
import { EventEditModal } from '@widgets/event';
import { Profile } from '@widgets/profile';
import { ProfileDeleted } from '@widgets/profile-deleted';
import { ProfileEdit } from '@widgets/profile-edit';
import { SendEmail } from '@widgets/send-email';

export const Routers: FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route path={ROUTES.CHATS.INDEX} element={<Chats />} />
        <Route path={ROUTES.CHATS.DETAIL(':id')} element={<Chat />} />
        <Route
          path={ROUTES.ADD_EVENT}
          element={<ModalWrapper>Добавить ивент</ModalWrapper>}
        />
        <Route
          path={ROUTES.NOTIFICATIONS}
          element={
            <ModalWrapper>
              <Notifications />
            </ModalWrapper>
          }
        />
        <Route path={ROUTES.PROFILE.INDEX} element={<ProfilePage />}>
          <Route index element={<Profile />} />
          <Route path={ROUTES.PROFILE.EDIT} element={<ProfileEdit />} />
          <Route element={<DeletionGuard />}>
            <Route path={ROUTES.PROFILE.DELETED} element={<ProfileDeleted />} />
          </Route>
        </Route>
        <Route path={ROUTES.PROFILE.MY_EVENTS} element={<MyEvents />} />
        <Route path={ROUTES.PROFILE.DETAIL(':id')} element={<ProfilePage />} />
        <Route
          path={ROUTES.EVENT.DETAIL(':eventId')}
          element={<EventEditModal />}
        />
        <Route
          path={ROUTES.LIST}
          element={<ModalWrapper>Список событий</ModalWrapper>}
        />
        <Route path={ROUTES.AUTH} element={<AuthPage />} />
        <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
        <Route path={ROUTES.SEND_EMAIL} element={<SendEmail />} />
      </Route>
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      <Route path={ROUTES.TEST_PAGE} element={<TestPage />} />
    </Routes>
  );
};

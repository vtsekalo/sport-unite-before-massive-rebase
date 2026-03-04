import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '@layout/main';

import { AuthPage } from '@pages/auth';
import { Chat } from '@pages/chat';
import { Chats } from '@pages/chats';
import { CommonEventListPage } from '@pages/common-event-list';
import { CopyEventPage } from '@pages/copy-event';
import { CreateEventPage } from '@pages/create-event';
import { MyEventsPage } from '@pages/my-events';
import { NotFoundPage } from '@pages/not-found-page';
import { Notifications } from '@pages/notifications';
import { ProfilePage } from '@pages/profile';
import { RegistrationPage } from '@pages/registration';
import { TestPage } from '@pages/test-page';
import { DeletionGuard, ROUTES } from '@shared/lib';
import { EventCard } from '@widgets/event-card';
import { Profile } from '@widgets/profile';
import { ProfileDeleted } from '@widgets/profile-deleted';
import { ProfileEdit } from '@widgets/profile-edit';
import { SendEmail } from '@widgets/send-email';
import { UserProfile } from '@widgets/user-profile';

import { ProtectedRoute } from './protected-route';

export const Routers: FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route path={ROUTES.AUTH} element={<AuthPage />} />
        <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
        <Route path={ROUTES.SEND_EMAIL} element={<SendEmail />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.LIST} element={<CommonEventListPage />} />
          <Route path={ROUTES.CHATS.INDEX} element={<Chats />} />
          <Route path={ROUTES.CHATS.DETAIL(':id')} element={<Chat />} />
          <Route path={ROUTES.NOTIFICATIONS} element={<Notifications />} />
          <Route path={ROUTES.PROFILE.INDEX} element={<ProfilePage />}>
            <Route index element={<Profile />} />
            <Route path={ROUTES.PROFILE.EDIT} element={<ProfileEdit />} />
            <Route element={<DeletionGuard />}>
              <Route
                path={ROUTES.PROFILE.DELETED}
                element={<ProfileDeleted />}
              />
            </Route>
            <Route
              path={ROUTES.PROFILE.DETAIL(':id')}
              element={<UserProfile />}
            />
          </Route>
          <Route path={ROUTES.PROFILE.MY_EVENTS} element={<MyEventsPage />} />
          <Route path={ROUTES.EVENT.CREATE} element={<CreateEventPage />} />
          <Route path={ROUTES.EVENT.COPY(':id')} element={<CopyEventPage />} />
          <Route
            path={ROUTES.EVENT.DETAIL(':eventId')}
            element={<EventCard />}
          />
        </Route>
      </Route>
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      <Route path={ROUTES.TEST_PAGE} element={<TestPage />} />
    </Routes>
  );
};

// import dayjs from 'dayjs';
// import { FC, useEffect, useMemo } from 'react';

// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Typography } from '@mui/material';

// import { MessageCard } from '@entities/message-card';
// import { IUserProfile, useAppDispatch, useAppSelector } from '@shared/lib';

// import { chatActions } from '../model/messages';
// import { makeSelectAllMessages } from '../model/selectorse';

// interface ChatMessagesProps {
//   profile?: IUserProfile;
//   roomId: string;
// }

// export const ChatMessages: FC<ChatMessagesProps> = ({ profile, roomId }) => {
// const dispatch = useAppDispatch();

// const selectAll = useMemo(() => makeSelectAllMessages(roomId), [roomId]);
// const messages = useAppSelector(selectAll);

// useEffect(() => {
//   dispatch(chatActions.connectRequested({ roomId }));
//   return () => {
//     dispatch(chatActions.disconnectRequested());
//   };
// }, [dispatch, roomId]);

// return messages?.map((message) => (
//   <MessageCard
//     avtorNode={message?.senderName}
//     timeNode={
//       <Typography>
//         {message?.createdAt && dayjs(message.createdAt).format('HH:mm')}
//       </Typography>
//     }
//     messageNode={
//       <Typography fontSize='14px' fontWeight={400}>
//         {message?.text}
//       </Typography>
//     }
//     avatarNode={<AccountCircleIcon />}
//     isMyMessage={profile?.id === message?.userId}
//   />
// ));
// };

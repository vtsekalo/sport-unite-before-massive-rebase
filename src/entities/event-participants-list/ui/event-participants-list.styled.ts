import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Avatar,
  AvatarGroup,
  Box,
  ListItemButton,
  styled,
} from '@mui/material';

interface ListItemButtonProps {
  isExpandable?: boolean;
}

const EventListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isExpandable',
})<ListItemButtonProps>(({ isExpandable }) => ({
  padding: 0,
  cursor: isExpandable ? 'default' : 'pointer',
  '&:hover': isExpandable ? { backgroundColor: 'transparent' } : undefined,
  '&.Mui-disabled': {
    opacity: 1,
  },
}));

const EventAvatar = styled(Avatar)(() => ({
  width: 32,
  height: 32,
  cursor: 'pointer',
}));

const ParticipantListItem = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const UserGroup = styled(AvatarGroup)(() => ({
  '& .MuiAvatarGroup-avatar.MuiAvatar-colorDefault': {
    width: 32,
    height: 32,
  },
}));

interface ArrowProps {
  open?: boolean;
}

const ArrowDownIcon = styled(KeyboardArrowDownIcon, {
  shouldForwardProp: (prop) => prop !== 'open',
})<ArrowProps>(({ open }) => ({
  cursor: 'pointer',
  transform: open ? 'rotate(180deg)' : 'none',
  transition: 'transform 0.2s ease',
}));

export const Styled = {
  EventAvatar,
  EventListItemButton,
  UserGroup,
  ParticipantListItem,
  ArrowDownIcon,
};

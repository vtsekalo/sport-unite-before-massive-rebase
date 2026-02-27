import { FC, ReactNode } from 'react';

import { Box, useTheme } from '@mui/material';

type ProfileInfoProps = {
  avatarNode: ReactNode;
  personalNode: ReactNode;
  buttonsNode?: ReactNode;
};

const ProfileInfo: FC<ProfileInfoProps> = ({
  avatarNode,
  personalNode,
  buttonsNode,
}) => {
  const theme = useTheme();

  return (
    <Box
      display='grid'
      columnGap={{ xs: 2, md: 10 }}
      width='100%'
      rowGap={{
        xs: 2,
        md: 5,
      }}
      gridTemplateColumns={'auto 1fr'}
      gridTemplateAreas={{
        xs: `
          "avatar  info"
          "buttons buttons"
        `,
        md: `
          "avatar  buttons"
          "info    ."
        `,
      }}
    >
      <Box
        gridArea='avatar'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='start'
      >
        <Box
          width={{ xs: 160, md: 400 }}
          height={{ xs: 160, md: 400 }}
          borderRadius='50%'
          display='flex'
          alignItems='center'
          justifyContent='center'
          bgcolor={theme.palette.grey[100]}
        >
          {avatarNode}
        </Box>
      </Box>

      <Box
        gridArea='info'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        textAlign='center'
        width='100%'
      >
        {personalNode}
      </Box>

      {buttonsNode && (
        <Box
          gridArea='buttons'
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={2}
            width='100%'
            overflow='hidden'
          >
            {buttonsNode}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProfileInfo;

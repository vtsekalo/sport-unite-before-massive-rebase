import { FC, ReactNode } from 'react';

import { Box, BoxProps } from '@mui/material';

type ProfileInfoProps = {
  avatarNode: ReactNode;
  personalNode: ReactNode;
  buttonsNode?: ReactNode;
} & BoxProps;

const ProfileInfo: FC<ProfileInfoProps> = ({
  avatarNode,
  personalNode,
  buttonsNode,
  ...rest
}) => {
  return (
    <Box
      display='grid'
      columnGap={{ xs: 2, md: 10 }}
      width='100%'
      height='100%'
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
      {...rest}
    >
      <Box
        gridArea='avatar'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='start'
      >
        {avatarNode}
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

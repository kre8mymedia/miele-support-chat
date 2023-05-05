import { Box, Flex, Grid } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import DocChat from '~/lib/components/chats/DocChat';
import SettingsDrawer from '~/lib/components/drawers/SettingsDrawer';

const Home = () => {
  return (
    <>
      <NextSeo title="Home" />
      <Grid
        templateColumns={{
          base: '35% 65%',
        }}
        position="relative"
      >
        <Box
          display="flex"
          justifyContent="end"
          alignItems="end"
          pr={2}
          position="absolute"
          right={0}
          zIndex={2}
        >
          <SettingsDrawer />
        </Box>
      </Grid>

      <DocChat />
    </>
  );
};

export default Home;

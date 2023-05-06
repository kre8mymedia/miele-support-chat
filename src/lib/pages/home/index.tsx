import { Box, Grid, useMediaQuery } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import DocChat from '~/lib/components/chats/DocChat';
import SettingsDrawer from '~/lib/components/drawers/SettingsDrawer';
import ThemeToggle from '~/lib/layout/ThemeToggle';

const Home = () => {
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');

  return (
    <>
      <NextSeo title="Home" />
      <Grid
        templateColumns={{
          base: '35% 65%',
        }}
        position="relative"
      >
        {isLargerThanLG && (
          <Box 
            display="flex"
            justifyContent="end"
            alignItems="end"
            pr={2}
            position="absolute"
            right={'50px'}
            top={2}
            zIndex={2}
          >
            <ThemeToggle />
          </Box>
        )}
        <Box
          display="flex"
          justifyContent="end"
          alignItems="end"
          pr={2}
          position="absolute"
          right={1}
          top={2}
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

import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      margin="0 auto"
      maxWidth={{ base: '100%', lg: '100%' }}
      transition="0.5s ease-out"
    >
      <Box margin="1">
        <Header />
        <Flex as="main">
          <Box flex="0 0 auto" width={{ base: '0%', lg: '15%' }}>
            {/* Add your left sidebar content here */}
          </Box>
          <Box flex="1" width={{ base: '100%', lg: '75%' }}>
            {children}
          </Box>
        </Flex>
        {/* <Footer /> */}
      </Box>
    </Box>
  );
};

export default Layout;

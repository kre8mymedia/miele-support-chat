import { Box, Flex, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Flex as="header" width="full" align="center" py={2}>
      <ChakraLink ml={10}>DocumentGPT</ChakraLink>
      <Box marginLeft="auto" mr={2}>
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;

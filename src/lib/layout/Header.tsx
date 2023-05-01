import { Box, Flex, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Flex as="header" width="full" align="center" py={2}>
      <Box>
        <ChakraLink ml={5} href="https://help.form.io/">
          Form.io GPT
        </ChakraLink>{' '}
        - v8.0.1__5.0.1
        <Text fontSize="xs" ml={5} colorScheme="blue">
          <Link
            href="https://promptengineers.ai"
            // isExternal
            rel="noopener noreferrer"
          >
            powered by promptengineers.ai
          </Link>
        </Text>
      </Box>
      <Box marginLeft="auto" mr={2}>
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;

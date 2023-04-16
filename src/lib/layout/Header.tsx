import { Box, Flex, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Flex as="header" width="full" align="center" py={2}>
      <Box>
        <ChakraLink ml={5} href="https://python.langchain.com/en/latest">
          Langchain GPT
        </ChakraLink>{' '}
        - v0.0.139
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

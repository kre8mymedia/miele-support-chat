import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center">
      <Text fontSize="sm">
        {new Date().getFullYear()} -{' '}
        <Link
          href="https://promptengineers.ai"
          isExternal
          rel="noopener noreferrer"
        >
          promptengineers.ai
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;

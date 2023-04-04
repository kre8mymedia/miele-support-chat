import { Grid, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

const SomeText = () => {
  return (
    <Grid textAlign="center">
      <Heading as="h1" size="lg">
        <Link href="https://promptengineers.ai"><ChakraLink color="blue.200">Prompt Engineers</ChakraLink></Link> Chat Starter
      </Heading>

      <Text fontSize="xs">
        This is a Next.js app with Chakra-UI and TypeScript setup.
      </Text>
    </Grid>
  );
};

export default SomeText;

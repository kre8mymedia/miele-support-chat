import { Grid, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

const SomeText = () => {
  return (
    <Grid textAlign="center">
      <Heading as="h1" size="lg">
        Welcome to{' '}
        <ChakraLink
          color="green.200"
          href="https://help.form.io"
          isExternal
          rel="noopener noreferrer"
        >
          Form.io GPT
        </ChakraLink>
      </Heading>

      <Text fontSize="s">
        This chatbot is equipped with the full documentation from Form.io
      </Text>
    </Grid>
  );
};

export default SomeText;

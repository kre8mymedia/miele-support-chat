import { Grid, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

const SomeText = () => {
  return (
    <Grid textAlign="center">
      <Heading as="h1" size="lg">
        Welcome to{' '}
        <ChakraLink
          color="red.600"
          href="https://us.mieleusa.com/spec-library/?PageName=Spec"
          isExternal
          rel="noopener noreferrer"
        >
          Miele GPT
        </ChakraLink>
      </Heading>

      <Text fontSize="s">
        This chatbot is equipped with the full documentation from Miele
      </Text>
    </Grid>
  );
};

export default SomeText;

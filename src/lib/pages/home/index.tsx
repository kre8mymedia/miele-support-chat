import { Flex } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import DocChat from '~/lib/components/chats/DocChat';
import CTASection from '~/lib/components/samples/CTASection';
import SomeImage from '~/lib/components/samples/SomeImage';
import SomeText from '~/lib/components/samples/SomeText';

const Home = () => {
  return (
    // <Flex
    //   direction="column"
    //   alignItems="center"
    //   justifyContent="center"
    //   minHeight="75vh"
    //   gap={4}
    //   mb={8}
    //   w="full"
    // >
    //   <NextSeo title="Home" />
    //   <DocChat />
    //   {/* <SomeText />
    //   <SomeImage />
    //   <CTASection /> */}
    // </Flex>
    <>
      <NextSeo title="Home" />
      <DocChat />
    </>
  );
};

export default Home;

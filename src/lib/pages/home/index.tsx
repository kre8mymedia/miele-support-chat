import { Flex } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import DocChat from '~/lib/components/chats/DocChat';
import CTASection from '~/lib/components/samples/CTASection';
import SomeImage from '~/lib/components/samples/SomeImage';
import SomeText from '~/lib/components/samples/SomeText';

const Home = () => {
  return (
    <>
      <NextSeo title="Home" />
      <DocChat />
    </>
  );
};

export default Home;

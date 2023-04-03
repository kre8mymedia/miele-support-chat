import { ChakraProvider } from '@chakra-ui/react';

import AppProvider from '../contexts/AppContext';
import ChatProvider from '../contexts/ChatContext';
import customTheme from '~/lib/styles/theme/index';

interface ChakraProps {
  children: React.ReactNode;
}

export const Chakra = ({ children }: ChakraProps) => {
  return (
    <ChakraProvider theme={customTheme}>
      <AppProvider>
        <ChatProvider>{children}</ChatProvider>
      </AppProvider>
    </ChakraProvider>
  );
};

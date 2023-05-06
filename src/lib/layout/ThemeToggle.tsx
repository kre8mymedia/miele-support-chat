import { Button, Icon, IconButton, useColorMode } from '@chakra-ui/react';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      aria-label="theme toggle"
      onClick={toggleColorMode}
      size="sm"
      py={4}
    >
      <Icon
        fontSize="20px"
        as={colorMode === 'light' ? RiMoonFill : RiSunLine}
      />
    </Button>
  );
};

export default ThemeToggle;

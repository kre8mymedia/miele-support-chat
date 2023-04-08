import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Stack,
  FormLabel,
  Input,
  Box,
  Textarea,
  Tooltip,
  Grid,
  Slider,
  SliderThumb,
  SliderTrack,
  SliderFilledTrack,
  Icon,
  FormControl,
  Select,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { MdGraphicEq } from 'react-icons/md';
import { RxReset } from 'react-icons/rx';

import { ChatModels } from '../../config/index';
import {
  defaultSystemMessage,
  useChatContext,
} from '../../contexts/ChatContext';

export default function SettingsDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<HTMLTextAreaElement | null>(null);
  const {
    systemMessage,
    setSystemMessage,
    temperature,
    setTemperature,
    setChatModel,
  } = useChatContext();

  const handleSliderChange = (e: { target: { value: string } }) => {
    setTemperature(parseInt(e.target.value, 10));
  };

  const handleModelChange = (e: { target: { value: any } }) => {
    setChatModel(e.target.value);
  };

  return (
    <>
      <Tooltip label="Settings">
        <Button size="sm" onClick={onOpen}>
          <Icon fontSize="18px" as={AiFillSetting} />
        </Button>
      </Tooltip>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Settings</DrawerHeader>
          <DrawerBody>
            <Stack spacing="24px">
              <Box mt={5}>
                <FormControl mt={3} position="relative">
                  {systemMessage === defaultSystemMessage ? null : (
                    <Tooltip label="Reset System Message">
                      <Button
                        zIndex={100}
                        position="absolute"
                        colorScheme="blue"
                        size="xs"
                        // mt={2}
                        // variant="unstyled"
                        right="10px"
                        top="-5px"
                        onClick={() => setSystemMessage(defaultSystemMessage)}
                      >
                        <Icon fontSize="20px" as={RxReset} />
                      </Button>
                    </Tooltip>
                  )}
                  <FormLabel mb="-40px" ml="15px" color="gray">
                    SYSTEM
                  </FormLabel>
                  <Textarea
                    pt={10}
                    id="desc"
                    ref={firstField}
                    placeholder="System Message"
                    minH="300px"
                    value={systemMessage}
                    onChange={(e) => setSystemMessage(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={3}>
                  <Grid
                    templateColumns={{
                      base: '70% 30%',
                    }}
                  >
                    <Box>
                      <FormLabel>Temperature</FormLabel>
                    </Box>
                    <Box
                      gridColumn={{ base: '2', lg: '2' }}
                      textAlign={{ base: 'right', lg: 'right' }}
                    >
                      <Input
                        placeholder="extra small size"
                        size="xs"
                        value={temperature}
                        onChange={handleSliderChange}
                      />
                    </Box>
                  </Grid>

                  <Slider
                    // isDisabled={true}
                    value={temperature}
                    aria-label="slider-ex-4"
                    defaultValue={90}
                    min={0}
                    max={100}
                    onChange={(val) => setTemperature(val)}
                  >
                    <SliderTrack bg="red.100">
                      <SliderFilledTrack bg="tomato" />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                      <Box color="tomato" as={MdGraphicEq} />
                    </SliderThumb>
                  </Slider>
                </FormControl>

                <FormControl>
                  <FormLabel>Model</FormLabel>
                  <Select
                    variant="outline"
                    size="sm"
                    onChange={handleModelChange}
                  >
                    <option value={ChatModels.GPT_3_5}>gpt-3.5-turbo</option>
                    {/* <option value='gpt-3.5-turbo-0301'>gpt-3.5-turbo-0301</option> */}
                    <option value={ChatModels.GPT_4}>gpt-4</option>
                    {/* <option value='gpt-4-0314'>gpt-4-0314</option> */}
                    {/* <option value={OpenAiChatModels.GPT_4_32K}>gpt-4-32k</option> */}
                    {/* <option value='gpt-4-32k-0314'>gpt-4-32k-0314</option> */}
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

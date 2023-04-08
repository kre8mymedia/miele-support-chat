import {
  Box,
  Button,
  Text,
  Flex,
  FormControl,
  FormHelperText,
  IconButton,
  InputGroup,
  InputRightElement,
  Textarea,
  useColorMode,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState, useRef, useEffect, CSSProperties } from 'react';
import { TbSend } from 'react-icons/tb';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';

import { useChatContext } from '../../contexts/ChatContext';
import CTASection from '../samples/CTASection';
import SomeText from '../samples/SomeText';

export default function DocChat() {
  const { colorMode } = useColorMode();
  const chatContainerRef: React.RefObject<HTMLDivElement> = useRef(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const {
    temperature,
    systemMessage,
    params,
    setParams,
    header,
    loadMessages,
    messages,
    connected,
    setConnected,
    wsUrl,
    setWsUrl,
    setHeader,
    websckt,
    setWebsckt,
    disconnect,
    chatModel,
  } = useChatContext();
  const [question, setQuestion] = useState('');
  const [shouldScroll, setShouldScroll] = useState(true);
  const [sendButtonColor, setSendButtonColor] = useState('gray');
  const newColor = colorMode === 'light' ? 'red' : 'cyan';

  const handleScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const isScrolledToBottom =
        chatContainer.scrollHeight - chatContainer.clientHeight <=
        chatContainer.scrollTop + 1;
      if (isScrolledToBottom) {
        setShouldScroll(true);
      } else {
        setShouldScroll(false);
      }
    }
  };

  function sendMessage(event: any) {
    event.preventDefault();
    if (question === '') {
      return;
    }
    websckt.send(
      JSON.stringify({
        question,
        system: systemMessage,
        temperature: temperature / 100,
        model: chatModel,
      })
    );
    setQuestion('');
    inputRef.current?.focus();
  }

  useEffect(() => {
    setConnected(false);
    const ws = new WebSocket(wsUrl);
    setWebsckt(ws);
    ws.onopen = (event) => {
      console.log('Connected!');
      setConnected(true);
    };
    ws.onmessage = function (event) {
      loadMessages(event);
    };

    return () => {
      ws.close();
    };
  }, [wsUrl]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (shouldScroll && chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, shouldScroll]);

  useEffect(() => {
    if (!question) {
      setSendButtonColor('gray');
    } else {
      setSendButtonColor(newColor);
    }
  }, [question]);

  useEffect(() => {
    setHeader(connected ? 'What can I help you accomplish?' : '📡 Loading...');
  }, [connected]);
  return (
    <Box height="100%">
      <Box>
        {messages ? (
          <Box
            ref={chatContainerRef}
            onScroll={handleScroll}
            style={{
              height: '80vh',
              overflowY: 'scroll',
              maxWidth: '98vw',
            }}
          >
            <Box
              style={{
                background: colorMode === 'light' ? 'whitesmoke' : '#171923',
                // padding: "10px",
                // whiteSpace: 'pre-line'
                fontSize: '14px',
              }}
            >
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  div: ({ node, ...props }) => (
                    <div className="chat-space" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p style={{ padding: '15px' }} {...props} />
                  ),
                  table: ({ node, ...props }) => (
                    <table
                      style={{ padding: '15px' }}
                      className="table-with-white-border"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="margin-left-right" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="margin-left-right" {...props} />
                  ),
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <Box p="10px">
                        <Box bg="black" mb={-2} p={1.5}>
                          <Text>{match[1]}</Text>
                        </Box>
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          language={match[1]}
                          PreTag="section"
                          {...props}
                          style={colorMode === 'light' ? undefined : okaidia}
                        />
                      </Box>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {messages}
              </ReactMarkdown>
            </Box>
          </Box>
        ) : (
          <Box
            ref={chatContainerRef}
            style={{
              height: '80vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Box>
              <SomeText />
              <CTASection />
            </Box>
            {/* <Text
              style={{
                position: 'absolute',
                bottom: 3,
                left: 0,
                right: 0,
                textAlign: 'center',
              }}
            >
              {connected ? 'What can I help you accomplish?' : '📡 Loading...'}
            </Text> */}
          </Box>
        )}
      </Box>
      <Box className="chat-input-space" background="#171923">
        <Box textAlign="center" height="24px">
          {header}
        </Box>
        <FormControl isRequired>
          <InputGroup>
            <Textarea
              // pr="34px"
              rows={2}
              placeholder="Ask a question..."
              ref={inputRef}
              onChange={(e: any) => setQuestion(e.target.value)}
              value={question || ''}
            />
            <InputRightElement
              position="absolute"
              // right="-7px"
              bottom="0px"
              height="auto"
              zIndex="2"
            >
              <IconButton
                isLoading={!connected}
                isDisabled={!connected}
                fontSize={19}
                color={sendButtonColor}
                variant="unstyled"
                aria-label="Send message"
                icon={<TbSend />}
                type="submit"
                onClick={(e) => sendMessage(e)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>
    </Box>
  );
}

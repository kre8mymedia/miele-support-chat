import { Box, Button, Flex, FormControl, IconButton, InputGroup, InputRightElement, Textarea, useColorMode } from '@chakra-ui/react';
import { useState, useRef, useEffect, CSSProperties } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import { useChatContext } from '../../contexts/ChatContext';
import { TbSend } from 'react-icons/tb';

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
    websckt,
    setWebsckt,
    disconnect,
    chatModel,
  } = useChatContext();
  const [question, setQuestion] = useState('');
  const [shouldScroll, setShouldScroll] = useState(true);
  const [sendButtonColor, setSendButtonColor] = useState('gray');
  const newColor = (colorMode === 'light') ? 'red' : 'cyan';

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
      setSendButtonColor('gray')
    } else {
      setSendButtonColor(newColor)
    }
  }, [question])

  return (
    <Box m={1} mt={-4} height="100%">
      <Box mb={1}>
        {messages ? (
          <div
            ref={chatContainerRef}
            onScroll={handleScroll}
            style={{
              height: "75vh",
              overflowY: "scroll",
              maxWidth: "100vw",
            }}
          >
            <div
              style={{
                background: (colorMode === 'light') ? 'whitesmoke' : '#171923',
                padding: '10px',
                whiteSpace: 'pre-line',
              }}
            >
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  table: ({ node, ...props }) => (
                    <table className="table-with-white-border" {...props} />
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
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        language={match[1]}
                        PreTag="section"
                        {...props}
                        style={colorMode === 'light' ? undefined : okaidia}
                      />
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
            </div>
          </div>
        ) : (
          <div
            ref={chatContainerRef}
            style={{
              height: '70vh',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <h3
              style={{
                position: 'absolute',
                bottom: 3,
                left: 0,
                right: 0,
              }}
            >
              {connected ? 'What can I help you accomplish?' : '📡 Loading...'}
            </h3>
          </div>
        )}
      </Box>
      <Box mb={1}>
        <Box textAlign="center">{header}</Box>
        <FormControl isRequired>
          <InputGroup>
            <Textarea
              pr={'34px'}
              placeholder="Ask a question..."
              ref={inputRef}
              onChange={(e: any) => setQuestion(e.target.value)}
              value={question || ''}
            />
            <InputRightElement
              position="absolute"
              right="-7px"
              bottom="0px"
              height="auto"
              zIndex="2"
            >
              <IconButton
                fontSize={19}
                color={sendButtonColor}
                variant={'unstyled'}
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

import { useColorMode, useDisclosure } from '@chakra-ui/react';
import { useContext, createContext, useState, useEffect } from 'react';

import {
  API_KEY,
  AWS_BUCKET_NAME,
  HOST,
  VECTORSTORE_FILE_PATH,
} from '../config';
import type { IContextProvider } from '../interfaces/Provider';

import { useAppContext } from './AppContext';

export const ChatContext = createContext({});

export const defaultSystemMessage = `Use the following pieces of context to answer the question at the end. If you don't know the answer or if the required code is not present, just say that you don't know, and don't try to make up an answer. Please provide a code snippet wrapped in triple backticks, along with the language name for proper formatting, if applicable.`;

export default function ChatProvider({ children }: IContextProvider) {
  const { colorMode } = useColorMode();
  const [websckt, setWebsckt] = useState<WebSocket>();
  const [connected, setConnected] = useState(true);
  const oldColor = colorMode === 'light' ? 'cyan' : 'red';
  const newColor = colorMode === 'light' ? 'red' : 'cyan';
  // Settings
  const [chatModel, setChatModel] = useState('gpt-3.5-turbo');
  const [header, setHeader] = useState('');
  const [messages, setMessages] = useState('');
  const [temperature, setTemperature] = useState<number>(90);
  const [systemMessage, setSystemMessage] = useState(defaultSystemMessage);
  const [params, setParams] = useState({
    bucketName: AWS_BUCKET_NAME || 'prompt-engineers-dev',
    filePath: VECTORSTORE_FILE_PATH || 'formio.pkl',
  });
  const [wsUrl, setWsUrl] = useState(
    `${HOST}/chat-vector-db?api_key=${API_KEY}&bucket=${params.bucketName}&path=${params.filePath}`
  );

  /**
   * Loads the messages into the UI
   * @param event
   */
  function loadMessages(event: any) {
    const data = JSON.parse(event.data);
    if (data.sender === 'bot') {
      if (data.type === 'start') {
        setMessages((prevString) => `${prevString}\n <div>🤖 AI: `);
      } else if (data.type === 'stream') {
        setHeader('🤖 AI is typing...');
        setMessages((prevString) => `${prevString}${data.message}`);
      } else if (data.type === 'info') {
        setHeader(data.message);
      } else if (data.type === 'end') {
        setHeader('');
        setMessages((prevString) => `${prevString}\n</div>`);
      } else if (data.type === 'error') {
        setMessages((prevString) => `${prevString}\n${data.message}`);
      }
    } else {
      setMessages(
        (prevString) =>
          `${prevString}\n <p class="chat-space" style="color: ${newColor}; backgroundColor: #2C313D;">👨‍💻 You: ${data.message}</p>`
      );
    }
  }

  function disconnect() {
    setConnected(false);
    websckt?.close();
  }

  useEffect(() => {
    const switchColor = messages.replace(new RegExp(oldColor, 'g'), newColor);
    setMessages(switchColor);
  }, [colorMode]);

  return (
    <ChatContext.Provider
      value={{
        temperature,
        setTemperature,
        systemMessage,
        setSystemMessage,
        params,
        setParams,
        header,
        setHeader,
        messages,
        setMessages,
        loadMessages,
        connected,
        setConnected,
        wsUrl,
        setWsUrl,
        disconnect,
        websckt,
        setWebsckt,
        chatModel,
        setChatModel,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext(): any {
  return useContext(ChatContext);
}

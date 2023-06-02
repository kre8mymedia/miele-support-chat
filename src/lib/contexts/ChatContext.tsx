import { useColorMode } from '@chakra-ui/react';
import { useContext, createContext, useState, useEffect } from 'react';

import {
  API_KEY,
  AWS_BUCKET_NAME,
  DEFAULT_CHAT_MODEL,
  HOST,
  VECTORSTORE_FILE_PATH,
} from '../config';
import type { IContextProvider } from '../interfaces/Provider';

type Message = {
  content: string;
  className: string;
};

export const defaultSystemMessage = `PERSONA:
Imagine you super intelligent AI assistant for the context.

INSTRUCTION:
Use the following pieces of context to answer the question at the end. If you don't know the answer or if the required code is not present, just say that you don't know, and don't try to make up an answer. 

OUTPUT FORMAT RULES:
Code snippets should be wrapped in triple backticks, along with the language name for proper formatting, if applicable.`;

export const ChatContext = createContext({});
export default function ChatProvider({ children }: IContextProvider) {
  const { colorMode } = useColorMode();
  const [websckt, setWebsckt] = useState<WebSocket>();
  const [connected, setConnected] = useState(true);
  const oldColor = colorMode === 'light' ? 'cyan' : 'red';
  const newColor = colorMode === 'light' ? 'red' : 'cyan';
  // Settings
  const [chatModel, setChatModel] = useState(DEFAULT_CHAT_MODEL);
  const [header, setHeader] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [temperature, setTemperature] = useState<number>(90);
  const [systemMessage, setSystemMessage] = useState(defaultSystemMessage);
  const [params, setParams] = useState({
    bucketName: AWS_BUCKET_NAME || 'prompt-engineers-dev',
    filePath: VECTORSTORE_FILE_PATH || 'miele-vectorstore.pkl',
  });
  const [wsUrl, setWsUrl] = useState(`${HOST}/miele-proxy`);
  const [isChecked, setIsChecked] = useState(false);

  const addMessage = (content: any, className: string) => {
    setMessages((prevMessages) => [...prevMessages, { content, className }]);
  };

  const updateLastMessage = (message: string) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      const lastMessageIndex = updatedMessages.length - 1;
      const lastMessageContent = updatedMessages[lastMessageIndex].content;

      if (!lastMessageContent.endsWith(message)) {
        updatedMessages[lastMessageIndex].content +=
          message === '\n' ? '\n' : message;
      }

      return updatedMessages;
    });
  };

  /**
   * Loads the messages into the UI
   * @param event
   */
  function loadMessages(event: any) {
    const data = JSON.parse(event.data);
    // console.log(data);
    if (data.sender === 'bot') {
      if (data.type === 'start') {
        setHeader('Computing answer...');
        addMessage('', 'server-message');
      } else if (data.type === 'stream') {
        setHeader('Chatbot is typing...');
        updateLastMessage(data.message);
      } else if (data.type === 'info') {
        setHeader(data.message);
      } else if (data.type === 'end') {
        setHeader('Ask a question');
      } else if (data.type === 'error') {
        setHeader('Ask a question');
        updateLastMessage(data.message);
      }
    } else {
      addMessage(data.message, 'client-message');
    }
  }

  function resetSession() {
    console.log('resetting session');
    setMessages([]);
    websckt?.close();
    // This will not connect but is here to reset the connection by changing the wsUrl
    setWsUrl(`${HOST}/miele-proxy?test=1234`);
    setTimeout(() => {
      setWsUrl(`${HOST}/miele-proxy`);
    }, 500);
    // This will reconnect to create a new session
  }

  function disconnect() {
    setConnected(false);
    websckt?.close();
  }

  useEffect(() => {
    const prevModelExists = sessionStorage.getItem('model');
    if (prevModelExists) {
      setChatModel(prevModelExists);
    }
  }, [chatModel]);

  useEffect(() => {
    const prevMessageExists = sessionStorage.getItem('systemMessage');
    if (prevMessageExists) {
      setSystemMessage(prevMessageExists);
    }
  }, [systemMessage]);

  useEffect(() => {
    const prevExists = sessionStorage.getItem('sources');
    if (prevExists) {
      setIsChecked(prevExists !== 'false');
    }
  }, [isChecked]);

  // useEffect(() => {
  //   const switchColor = messages.replace(new RegExp(oldColor, 'g'), newColor);
  //   setMessages(switchColor);
  // }, [colorMode]);

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
        isChecked,
        setIsChecked,
        resetSession,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext(): any {
  return useContext(ChatContext);
}

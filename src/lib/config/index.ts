export const HOST =
  process.env.NEXT_PUBLIC_HOST || 'wss://api.promptengineers.ai';
// export const HOST = 'ws://localhost:8000';
export const API_KEY = process.env.NEXT_PUBLIC_PE_API_KEY;

export const AWS_BUCKET_NAME =
  process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || 'prompt-engineers-dev';
export const VECTORSTORE_FILE_PATH =
  process.env.NEXT_PUBLIC_VECTORSTORE_FILE_PATH || 'miele-vectorstore.pkl';

export enum ChatModels {
  GPT_3_5 = 'gpt-3.5-turbo',
  GPT_4 = 'gpt-4',
}

export const DEFAULT_CHAT_MODEL =
  process.env.NEXT_PUBLIC_DEFAULT_CHAT_MODEL || ChatModels.GPT_3_5;

export const APP_TITLE = process.env.NEXT_PUBLIC_APP_TITLE || 'Langchain GPT';
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '';
export const CONTEXT_LINK =
  process.env.NEXT_PUBLIC_CONTEXT_LINK ||
  'https://python.langchain.com/en/latest';

export const SIDEBAR_COLOR = '#000';
export const MAIN_BG = '#333';
export const SECONDARY = '#6AB148';
export const CLIENT_MSG_BG = '#272822';

export const APP_NAME = 'Miele GPT';

export const LOGO_LINK = '';

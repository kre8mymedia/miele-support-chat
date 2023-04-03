export const HOST =
  process.env.NEXT_PUBLIC_HOST || 'wss://api.promptengineers.ai';
// export const HOST = 'ws://localhost:8000';
export const API_KEY = process.env.NEXT_PUBLIC_PE_API_KEY;

export const AWS_BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || 'prompt-engineers-dev'
export const VECTORSTORE_FILE_PATH = process.env.NEXT_PUBLIC_VECTORSTORE_FILE_PATH ||  'formio.pkl'
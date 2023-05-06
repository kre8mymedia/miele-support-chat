// websocket-proxy/index.js
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

const apiKey = 'pe-AbdDBg0fuiYvkOCmv2AQ0VLxXvjoQSUl';
const apiUrl = 'wss://dev-api.promptengineers.ai';

server.on('connection', (clientSocket) => {
  const url = `${apiUrl}/chat-vector-db?api_key=${apiKey}&bucket=prompt-engineers-dev&path=formio.pkl`
  console.log(url)
  const targetSocket = new WebSocket(url);

  targetSocket.on('message', (message) => {
    console.log('target', message.toString())
    clientSocket.send(message);
  });

  clientSocket.on('message', (message) => {
    console.log('client', message.toString())
    targetSocket.send(message);
  });

  clientSocket.on('close', () => {
    targetSocket.close();
  });

  targetSocket.on('close', () => {
    clientSocket.close();
  });
});

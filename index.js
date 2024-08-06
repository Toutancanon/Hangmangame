const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const { WebcastPushConnection } = require('tiktok-live-connector');

const port = process.env.PORT || 8080;  // Utilisez le port défini par l'environnement, sinon 8080

app.use(express.static(path.join(__dirname, 'public')));

function listenToTikTokChat() {
  const tiktokUsername = 'YOUR_TIKTOK_USERNAME';
  const tiktokChatConnection = new WebcastPushConnection(tiktokUsername);

  tiktokChatConnection.connect().then(state => {
    console.log(`Connected to roomId ${state.roomId}`);
  }).catch(err => {
    console.error('Failed to connect', err);
  });

  tiktokChatConnection.on('chat', data => {
    console.log('Chat message received:', data.comment);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.comment);
      }
    });
  });
}

listenToTikTokChat();

wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
  });
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

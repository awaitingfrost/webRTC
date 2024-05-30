const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', ws => {
  const fileStream = fs.createWriteStream('output.wav');

  ws.on('message', message => {
    fileStream.write(message);
  });

  ws.on('close', () => {
    fileStream.end();
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on('connection', (ws) => {
    // Add client to the list
    clients.push(ws);

    // Handle incoming messages
    ws.on('message', (message) => {
        console.log('received: %s', message);

        // Broadcast the received message to all clients
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle WebSocket close
    ws.on('close', () => {
        // Remove client from the list when disconnected
        clients = clients.filter(client => client !== ws);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');

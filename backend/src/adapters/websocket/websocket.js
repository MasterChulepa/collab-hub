import { WebSocketServer } from "ws";

export class WSServer {
  constructor(serverOptions) {
    this.wss = new WebSocketServer(serverOptions);
    this.clients = new Map();

    this.setupConnectionHandling();
  }

  setupConnectionHandling() {
    this.wss.on("connection", (ws) => {
      console.log("Connected");
      ws.send;

      ws.on("message", (data) => {
        this.broadcast(data);
      });
    });
  }

  broadcast(message, excludeUserId = null) {
    const messageString = JSON.stringify(message);
    this.wss.clients.forEach((client) => {
      client.send(messageString);
    });
  }
}

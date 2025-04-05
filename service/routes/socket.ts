/* eslint-disable @typescript-eslint/no-explicit-any */
// import { randomUUID } from "crypto";
import { Server } from "http";
import WebSocket, { WebSocketServer } from "ws";

type Connection = { id?: string; sessionIds?: string[] };

// const connections: { [id: string]: Connection } = {};

export function socket(httpServer: Server) {
  console.log(httpServer);
  // Create a websocket object
  const socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on("connection", (socket: WebSocket & Connection) => {
    // const id = randomUUID();
    // socket.id = id;
    // httpServer.isAlive = true;

    socket.on("message", (data: any) => {
      const json = JSON.parse(data);

      if (json.action === "sessions") {
        socket.sessionIds = json.sessionIds;
      } else if (json.action === "toggle") {
        return;
      } else if (json.action === "end") {
        return;
      }

      // socketServer.clients.forEach((client) => {
      //   if (client !== socket && client.readyState === WebSocket.OPEN) {
      //     client.send(data);
      //   }
      // });
    });

    // Respond to pong messages by marking the connection alive
    // socket.on("pong", () => {
    //   httpServer.isAlive = true;
    // });
  });

  // Periodically send out a ping message to make sure clients are alive
  // setInterval(() => {
  //   socketServer.clients.forEach((client) => {
  //     if (httpServer.isAlive === false) {
  //       console.log('terminating', httpServer);
  //       return client.terminate();
  //     }

  //     console.log('still alive!');
  //     httpServer.isAlive = false;
  //     client.ping();
  //   });
  // }, 2000);
}

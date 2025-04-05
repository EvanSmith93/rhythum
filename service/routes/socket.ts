/* eslint-disable @typescript-eslint/no-explicit-any */
// import { randomUUID } from "crypto";
import { Server } from "http";
import WebSocket, { WebSocketServer } from "ws";
import { toggleBreak } from "../services/session";

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

    function sendToSession(sessionId: string, data: any) {
      socketServer.clients.forEach((client: WebSocket & Connection) => {
        console.log(client.sessionIds);
        if (
          client.readyState === WebSocket.OPEN &&
          client.sessionIds?.includes(sessionId)
        ) {
          console.log("sending", sessionId, data);
          client.send(JSON.stringify(data));
        }
      });
    }

    socket.on("message", async (data: any) => {
      const json = JSON.parse(data);

      if (json.action === "SET_SESSION_IDS") {
        socket.sessionIds = json.sessionIds;
      } else if (json.action === "TOGGLE_BREAK") {
        const session = await toggleBreak(json.sessionId);
        sendToSession(json.sessionId, { action: "TOGGLE_BREAK", session });
      } else if (json.action === "END_SESSION") {
        // const session = await endSession(json.sessionId);
        // sendToSession(json.sessionId, { action: "END_SESSION", session });
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
}

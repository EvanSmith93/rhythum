import { Server } from "http";
import WebSocket, { WebSocketServer } from "ws";
import { endSession, toggleBreak } from "../services/session";

type Connection = { id?: string; sessionIds?: string[] };

enum Actions {
  SET_SESSION_IDS = "SET_SESSION_IDS",
  TOGGLE_BREAK = "TOGGLE_BREAK",
  END_SESSION = "END_SESSION",
}

export function socket(httpServer: Server) {
  const socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on("connection", (socket: WebSocket & Connection) => {
    socket.on("message", async (data: string) => {
      const json = JSON.parse(data);

      switch (json.action) {
        case Actions.SET_SESSION_IDS:
          setSessionIdsEvent(json.sessionIds);
          break;
        case Actions.TOGGLE_BREAK:
          toggleBreakEvent(json.sessionId);
          break;
        case Actions.END_SESSION:
          endSessionEvent(json.sessionId);
          break;
      }
    });

    function setSessionIdsEvent(sessionIds: string[]) {
      socket.sessionIds = sessionIds;
    }

    async function toggleBreakEvent(sessionId: string) {
      const session = await toggleBreak(sessionId);
      sendToSession(sessionId, { session });
    }

    async function endSessionEvent(sessionId: string) {
      const session = await endSession(sessionId);
      sendToSession(sessionId, { session });
    }

    function sendToSession(sessionId: string, data: object) {
      socketServer.clients.forEach((client: WebSocket & Connection) => {
        if (
          client.readyState === WebSocket.OPEN &&
          client.sessionIds?.includes(sessionId)
        ) {
          client.send(JSON.stringify(data));
        }
      });
    }
  });
}

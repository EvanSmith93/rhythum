import { Session } from "../utils/types";
import { debounce } from "./helpers";

export class SocketCommunicator {
  private static socket: WebSocket;

  constructor({
    onToggle,
    onEnd,
  }: {
    onToggle: (session: Session) => void;
    onEnd: (session: Session) => void;
  }) {
    const port = window.location.port;
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";

    if (!SocketCommunicator.socket) {
      SocketCommunicator.socket = new WebSocket(
        `${protocol}://${window.location.hostname}:${port}/ws`
      );
    }

    SocketCommunicator.socket.onmessage = async (message: MessageEvent) => {
      try {
        const event = JSON.parse(message.data);
        console.log("event", event);

        if (event.action === "TOGGLE_BREAK") {
          onToggle(event.session);
        } else if (event.action === "END_SESSION") {
          onEnd(event.session);
        }
      } catch {
        console.error("Invalid JSON");
      }
    };
  }

  public setSessionIds = debounce((sessionIds: string[]) => {
    const message = {
      action: "SET_SESSION_IDS",
      sessionIds,
    };
    SocketCommunicator.socket.send(JSON.stringify(message));
  });

  public toggleBreak = debounce((sessionId: string) => {
    const message = {
      action: "TOGGLE_BREAK",
      sessionId,
    };
    SocketCommunicator.socket.send(JSON.stringify(message));
  });

  public endSession = debounce((sessionId: string) => {
    const message = {
      action: "END_SESSION",
      sessionId,
    };
    SocketCommunicator.socket.send(JSON.stringify(message));
  });
}

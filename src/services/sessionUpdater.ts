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

  public setSessionIds = debounce((sessionIds: string[]) =>
    this.sendMessage({
      action: "SET_SESSION_IDS",
      sessionIds,
    })
  );

  public toggleBreak = debounce((sessionId: string) =>
    this.sendMessage({
      action: "TOGGLE_BREAK",
      sessionId,
    })
  );

  public endSession = debounce((sessionId: string) =>
    this.sendMessage({
      action: "END_SESSION",
      sessionId,
    })
  );

  private sendMessage(message: object) {
    SocketCommunicator.socket.send(JSON.stringify(message));
  }
}

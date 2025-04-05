import { Session } from "../utils/types";
import { debounce } from "./helpers";

export class SocketCommunicator {
  private static socket: WebSocket;

  constructor(onUpdate: (session?: Session) => void) {
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";

    if (!SocketCommunicator.socket) {
      SocketCommunicator.socket = new WebSocket(
        `${protocol}://${window.location.hostname}:${window.location.port}/ws`
      );
    }

    SocketCommunicator.socket.onmessage = async (message: MessageEvent) => {
      try {
        const event = JSON.parse(message.data);
        console.log("event", event);
        onUpdate(event.session);
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

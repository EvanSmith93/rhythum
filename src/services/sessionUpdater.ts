import { Session } from "../utils/types";
import { debounce } from "./helpers";

enum Actions {
  SET_SESSION_IDS = "SET_SESSION_IDS",
  TOGGLE_BREAK = "TOGGLE_BREAK",
  END_SESSION = "END_SESSION",
}

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
      const event = JSON.parse(message.data);
      onUpdate(event.session);
    };
  }

  public setSessionIds = debounce((sessionIds: string[]) =>
    this.sendMessage({
      action: Actions.SET_SESSION_IDS,
      sessionIds,
    })
  );

  public toggleBreak = debounce((sessionId: string) =>
    this.sendMessage({
      action: Actions.TOGGLE_BREAK,
      sessionId,
    })
  );

  public endSession = debounce((sessionId: string) =>
    this.sendMessage({
      action: Actions.END_SESSION,
      sessionId,
    })
  );

  private sendMessage(message: object) {
    SocketCommunicator.socket.send(JSON.stringify(message));
  }
}

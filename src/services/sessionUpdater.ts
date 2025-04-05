import { Session } from "../utils/types";
import { debounce } from "./helpers";

export class SocketCommunicator {
  private static socket: WebSocket;
  private onToggle: (session: Session) => void;
  private onEnd: () => void;

  constructor({
    onToggle,
    onEnd,
  }: {
    onToggle: (session: Session) => void;
    onEnd: () => void;
  }) {
    const port = window.location.port;
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";

    if (!SocketCommunicator.socket) {
      SocketCommunicator.socket = new WebSocket(
        `${protocol}://${window.location.hostname}:${port}/ws`
      );
    }

    this.onToggle = onToggle;
    this.onEnd = onEnd;
    // this.socket.onopen = (event) => {
    //   this.receiveEvent(
    //     new EventMessage("Simon", GameEvent.System, { msg: "connected" })
    //   );
    // };

    // this.socket.onclose = (event) => {
    //   this.receiveEvent(
    //     new EventMessage("Simon", GameEvent.System, { msg: "disconnected" })
    //   );
    // };

    SocketCommunicator.socket.onmessage = async (msg: MessageEvent) => {
      console.log(msg);
      try {
        const event = JSON.parse(msg.data);
        console.log("event", event);

        if (event.action === "TOGGLE_BREAK") {
          onToggle(event.session);
        } else if (event.action === "END_SESSION") {
          return;
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
    console.log("sending", message);
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

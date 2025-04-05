import { debounce } from "./helpers";

class SessionUpdater {
  private socket: WebSocket;
  // private sessionIds: string[] = [];

  constructor() {
    const port = window.location.port;
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    this.socket = new WebSocket(
      `${protocol}://${window.location.hostname}:${port}/ws`
    );

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

    this.socket.onmessage = async (msg: MessageEvent) => {
      try {
        const event = JSON.parse(await msg.data.text());
        console.log('event', event);
        // this.receiveEvent(event);
      } catch {
        console.error("Invalid JSON");
      }
    };
  }

  public setSessionIds = debounce((sessionIds: string[]) => {
    const message = {
      action: "sessions",
      sessionIds,
    };
    console.log(message);
    this.socket.send(JSON.stringify(message));
  });
}

export const sessionUpdater = new SessionUpdater();

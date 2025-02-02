import { useEffect } from "react";
import { Message } from "../utils/types";

export default function useNotification() {
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function createNotificationObject(message: Message) {
    new Notification(message.title, {
      body: message.body,
      requireInteraction: true,
    });
  }

  function sendNotification(message: Message) {
    if (Notification.permission === "granted") {
      createNotificationObject(message);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          createNotificationObject(message);
        }
      });
    }
  }

  return { sendNotification };
}

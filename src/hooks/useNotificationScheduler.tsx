import { useState } from "react";
import { Message } from "../utils/types";
import useNotification from "./useNotification";

export default function useNotificationScheduler() {
  const [timeoutId, setTimeoutId] = useState<number | undefined>();
  const { sendNotification } = useNotification();

  function scheduleMessage(getMessage: () => Promise<Message>, time: number) {
    clearScheduled();
    const id = setTimeout(async () => {
      sendNotification(await getMessage());
    }, time);
    setTimeoutId(id);
  }

  function clearScheduled() {
    clearTimeout(timeoutId);
    setTimeoutId(undefined);
  }

  return { scheduleMessage, clearScheduled };
}

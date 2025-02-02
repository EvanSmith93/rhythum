import { useState } from "react";
import { Message } from "../utils/types";
import useNotification from "./useNotification";

export default function useNotificationScheduler() {
  const [timeoutId, setTimeoutId] = useState<number | undefined>();
  const { sendNotification } = useNotification();

  function scheduleMessage(
    message: Message,
    time: number,
    callback?: () => void
  ) {
    clearScheduled();
    const id = setTimeout(() => {
      sendNotification(message);
      if (callback) callback();
    }, time);
    setTimeoutId(id);
  }

  function clearScheduled() {
    clearTimeout(timeoutId);
    setTimeoutId(undefined);
  }

  return { scheduleMessage, clearScheduled };
}

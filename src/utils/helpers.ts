import { format } from "date-fns";
import { Session } from "./types";

export function formatDate(date: Date) {
  return format(date, "MMM d, yyyy h:mm aaaaa'm'");
}

export function formatSessionTimes(session: Session) {
  return `${formatDate(session.activityChanges[0])} - ${
    session.hasEnded
      ? formatDate(session.activityChanges[session.activityChanges.length - 1])
      : "Current"
  }`;
}

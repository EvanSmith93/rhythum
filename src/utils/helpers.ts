import { differenceInMilliseconds, format } from "date-fns";
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

export function calculateSessionTimeLengths(session: Session) {
  const changes = !session.hasEnded
    ? [...session.activityChanges, new Date()]
    : session.activityChanges;

  return changes
    .map((_, index) => {
      if (index === changes.length - 1) {
        return 0;
      }
      return differenceInMilliseconds(changes[index + 1], changes[index]);
    })
    .slice(0, -1);
}

export function calculateTotalSessionTime(session: Session) {
  return differenceInMilliseconds(
    session.hasEnded
      ? session.activityChanges[session.activityChanges.length - 1]
      : new Date(),
    session.activityChanges[0]
  );
}

export function generateCode() {
  const asciiMin = 65;
  const asciiMax = 91;

  const chars = [...Array(5).keys()].map(() => {
    const asciiChar =
      asciiMin + Math.floor(Math.random() * (asciiMax - asciiMin));
    return String.fromCharCode(asciiChar);
  });

  return chars.join("");
}

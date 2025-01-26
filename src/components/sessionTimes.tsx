import { format, isSameDay } from "date-fns";
import { Session } from "../utils/types";

function formatDate(date: Date) {
  return format(date, "MMM d, yyyy");
}

function formatTime(date: Date) {
  return format(date, "h:mm aaaaa'm'");
}

function formatDateTime(date: Date) {
  return `${formatDate(date)} ${formatTime(date)}`;
}

export default function SessionTimes({ session }: { session: Session }) {
  const start = session.activityChanges[0];
  const end = session.activityChanges[session.activityChanges.length - 1];
  const sameDay = isSameDay(start, end);

  return sameDay ? (
    <SameDayTimes start={start} end={end} hasEnded={session.hasEnded} />
  ) : (
    <DifferentDayTimes start={start} end={end} hasEnded={session.hasEnded} />
  );
}

type TimesProps = {
  start: Date;
  end: Date;
  hasEnded: boolean;
};

function SameDayTimes(props: TimesProps) {
  const startStr = formatTime(props.start);
  const endStr = formatTime(props.end);

  return (
    <p>
      {formatDate(props.start)}
      <br />
      {startStr} - {props.hasEnded ? endStr : "Current"}
    </p>
  );
}

function DifferentDayTimes(props: TimesProps) {
  const startStr = formatDateTime(props.start);
  const endStr = formatDateTime(props.end);

  return (
    <p>
      {startStr} -
      <br />
      {props.hasEnded ? endStr : "Current"}
    </p>
  );
}

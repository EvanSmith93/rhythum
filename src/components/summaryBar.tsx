import { useEffect, useMemo, useState } from "react";
import { Session } from "../utils/types";
import { differenceInSeconds } from "date-fns";

export default function SummaryBar({
  session,
  width,
  height,
}: {
  session: Session;
  width: number;
  height: number;
}) {
  const [timeLengths, setTimeLengths] = useState<number[]>();

  const totalTime = useMemo(
    () => timeLengths?.reduce((val, total) => total + val, 0) ?? 0,
    [timeLengths]
  );

  useEffect(() => {
    function updateTimeLengths() {
      const changes = !session.hasEnded
        ? [...session.activityChanges, new Date()]
        : session.activityChanges;

      const timeLengths = changes
        .map((change, index) => {
          if (index === changes.length - 1) {
            return 0;
          }
          return differenceInSeconds(changes[index + 1], change);
        })
        .slice(0, -1);

      setTimeLengths(timeLengths);
    }

    updateTimeLengths();

    if (!session.hasEnded) {
      setInterval(updateTimeLengths, 10 * 1000);
    }
  }, [session.activityChanges, session.hasEnded]);

  return (
    <div
      className="gap-0 p-0 overflow-hidden rounded"
      style={{
        height: `${height}px`,
      }}
    >
      {timeLengths?.map((interval, index) => (
        <span
          key={index}
          className={`d-inline-block ${
            index % 2 === 0 ? "dark-blue" : "light-blue"
          }`}
          style={{
            width: (interval / totalTime) * width,
            height: `${height}px`,
          }}
        ></span>
      ))}
    </div>
  );
}

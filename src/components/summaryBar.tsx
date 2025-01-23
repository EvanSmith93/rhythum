import { useEffect, useMemo, useState } from "react";
import { Session } from "../utils/types";
import {
  calculateSessionTimeLengths,
  calculateTotalSessionTime,
} from "../utils/helpers";

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
    () => calculateTotalSessionTime(session),
    [session]
  );

  useEffect(() => {
    function updateTimeLengths() {
      setTimeLengths(calculateSessionTimeLengths(session));
    }

    updateTimeLengths();
    if (!session.hasEnded) {
      setInterval(updateTimeLengths, 10 * 1000);
    }
  }, [session]);

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

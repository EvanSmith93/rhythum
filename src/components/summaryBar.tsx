import { useEffect, useState } from "react";
import { Session } from "../utils/types";
import {
  calculateSessionTimeLengths,
  calculateTotalSessionTime,
  formatIntervalLength,
} from "../utils/helpers";
import { OverlayTrigger, Tooltip, TooltipProps } from "react-bootstrap";

export default function SummaryBar({
  session,
  width,
  height,
  tooltip = false,
}: {
  session: Session;
  width: number;
  height: number;
  tooltip?: boolean;
}) {
  const [timeLengths, setTimeLengths] = useState<number[]>();

  useEffect(() => {
    function updateTimeLengths() {
      setTimeLengths(calculateSessionTimeLengths(session));
    }
    updateTimeLengths();

    if (session.hasEnded) return;
    const intervalId = setInterval(updateTimeLengths, 1000);

    return () => clearInterval(intervalId);
  }, [session]);

  const totalSessionTime = calculateTotalSessionTime(session);
  const heightStyle = `${height}px`;

  return (
    <div
      className="gap-0 p-0 overflow-hidden rounded"
      style={{ height: heightStyle }}
    >
      {timeLengths?.map((interval, index) => {
        const widthStyle =
          totalSessionTime !== 0
            ? (interval / totalSessionTime) * width
            : width;

        const renderTooltip = (props: TooltipProps) => {
          const seconds = Math.floor(interval / 1000);
          return <Tooltip {...props}>{formatIntervalLength(seconds)}</Tooltip>;
        };

        const colorBlock = (
          <span
            key={index}
            className={`d-inline-block ${
              index % 2 === 0 ? "dark-blue" : "light-blue"
            }`}
            style={{ width: widthStyle, height: heightStyle }}
          />
        );

        return tooltip ? (
          <OverlayTrigger overlay={renderTooltip}>{colorBlock}</OverlayTrigger>
        ) : (
          colorBlock
        );
      })}
    </div>
  );
}

import { Image } from "react-bootstrap";
import summaryBar from "../public/summaryBar.png";

export default function SummaryBar({ height }: { height: string }) {
  return (
    <Image
      className="summary-bar"
      src={summaryBar}
      alt="Summary bar of a session"
      height={height}
    />
  );
}

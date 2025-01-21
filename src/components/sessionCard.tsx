import { Link } from "react-router-dom";
import summaryBar from "../assets/summaryBar.png";
import { format } from "date-fns";

export type Session = {
  startTime: Date;
  endTime: Date | null;
};

export default function SessionCard({ session }: { session: Session }) {
  function formatDate(date: Date) {
    return format(date, "MMM d, yyyy h:mm aaaaa'm'");
  }

  return (
    <Link to="/session" className="session-card">
      <div>
        {formatDate(session.startTime)} -
        {session.endTime ? formatDate(session.endTime) : "Current"}
      </div>
      <img
        className="summary-bar"
        src={summaryBar}
        alt="Summary bar of a session"
        height="30px"
      />
    </Link>
  );
}

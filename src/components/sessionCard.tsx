import { Link } from "react-router-dom";
import summaryBar from "../assets/summaryBar.png";
import { format } from "date-fns";

export default function SessionCard() {
  const data = {
    startTime: new Date("2025-01-08T21:45:00.000Z"),
    endTime: new Date("2025-01-09T00:11:00.000Z"),
  };

  function formatDate(date: Date) {
    return format(date, "MMM d, yyyy h:mm aaaaa'm'");
  }

  return (
    <Link to="/session">
      <div className="session-card">
        <div>
          {formatDate(data.startTime)} - {formatDate(data.endTime)}
        </div>
        <img
          className="summary-bar"
          src={summaryBar}
          alt="Summary bar of a session"
          height="30px"
        />
      </div>
    </Link>
  );
}

import { Link } from "react-router-dom";
import SummaryBar from "./summaryBar";
import { Session } from "../utils/types";
import SessionTimes from "./sessionTimes";

export default function SessionCard({ session }: { session: Session }) {
  return (
    <Link to={`/sessions/${session._id}`} className="session-card">
      <SessionTimes session={session} />
      <SummaryBar session={session} width={200} height={30} />
    </Link>
  );
}

import { Link } from "react-router-dom";
import SummaryBar from "./summaryBar";
import { Session } from "../utils/types";
import { formatSessionTimes } from "../utils/helpers";

export default function SessionCard({ session }: { session: Session }) {
  return (
    <Link to={`/sessions/${session.id}`} className="session-card">
      <div>{formatSessionTimes(session)}</div>
      <SummaryBar session={session} width={200} height={30} />
    </Link>
  );
}

import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import SummaryBar from "../components/summaryBar";
import { sessions } from "../utils/staticData";
import { formatSessionTimes } from "../utils/helpers";

export default function SessionDetail() {
  const { sessionId } = useParams();
  const session = sessions.find((session) => session.id === sessionId);

  if (!session) {
    return <>Sorry! Could not find the session you are looking for.</>;
  }

  return (
    <>
      <div id="top-section">
        <div id="session-code">
          <strong>Session Code</strong>
          <br />
          {session.code}
        </div>

        <div id="notification" className="alert alert-warning">
          You've been on break for 15 minutes. Ready to get back into it?
          <br />
          <i>
            Through discipline comes freedom.
            <br />
            -Aristotle
          </i>
        </div>
      </div>

      <div id="center-content">
        <h3>Currently Taking a Break</h3>
        <p>{formatSessionTimes(session)}</p>
        <SummaryBar height="45px" />

        <div>
          <Button id="start-stop-break">Finish Break</Button>
          <Link to="/dashboard">
            <Button id="end-session">End Session</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

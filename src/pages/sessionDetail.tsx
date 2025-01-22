import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import SummaryBar from "../components/summaryBar";
import { formatSessionTimes } from "../utils/helpers";
import { useEffect, useState } from "react";
import { Session } from "../utils/types";
import { ClientDb } from "../services/clientDb";

export default function SessionDetail() {
  const { sessionId } = useParams();
  const [session, setSession] = useState<Session | undefined>();
  const [onBreak, setOnBreak] = useState(false);

  useEffect(() => {
    async function getSessions() {
      const clientDb = new ClientDb();
      const session = await clientDb.getSessionById("test", sessionId!);
      setSession(session);
    }

    getSessions();
  }, [sessionId]);

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
        <h3>{onBreak ? "Currently Taking a Break" : "Currently Studying"}</h3>
        <p>{formatSessionTimes(session)}</p>
        <SummaryBar height="45px" />

        <div>
          <Button
            className={onBreak ? "light-blue" : "dark-blue"}
            onClick={() => setOnBreak(!onBreak)}
          >
            {onBreak ? "Finish Break" : "Start Break"}
          </Button>
          <Link to="/dashboard">
            <Button id="end-session">End Session</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

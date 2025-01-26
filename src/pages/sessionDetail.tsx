import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import SummaryBar from "../components/summaryBar";
import { formatSessionTimes } from "../utils/helpers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Quote, Session } from "../utils/types";
import { ClientDb } from "../services/clientDb";

export default function SessionDetail() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | undefined>();
  const [quote, setQuote] = useState<Quote | undefined>();

  const onBreak = useMemo(
    () => (session ? session.activityChanges.length % 2 === 0 : false),
    [session]
  );

  const getSession = useCallback(async () => {
    const clientDb = new ClientDb();
    setSession(await clientDb.getSessionById("test", sessionId!));
    setQuote(await clientDb.getRandomQuote());
  }, [sessionId]);

  async function toggleBreak() {
    const clientDb = new ClientDb();
    await clientDb.toggleBreak("test", sessionId!);
    getSession();
  }

  function endSession() {
    const clientDb = new ClientDb();
    clientDb.endSession("test", sessionId!);
    navigate("/dashboard");
  }

  useEffect(() => {
    getSession();
  }, [getSession]);

  if (!session) {
    return <>Sorry! Could not find the session you are looking for.</>;
  }

  const summaryText = !session.hasEnded
    ? onBreak
      ? "Currently Taking a Break"
      : "Currently Studying"
    : "Session has Ended";

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
            {quote?.text}
            <br />-{quote?.author}
          </i>
        </div>
      </div>

      <div id="center-content">
        <h3>{summaryText}</h3>
        <p>{formatSessionTimes(session)}</p>
        <SummaryBar session={session} width={550} height={45} />

        {!session.hasEnded && (
          <div>
            <Button
              className={onBreak ? "light-blue" : "dark-blue"}
              onClick={toggleBreak}
            >
              {onBreak ? "Finish Break" : "Start Break"}
            </Button>
            <Button id="end-session" onClick={endSession}>
              End Session
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

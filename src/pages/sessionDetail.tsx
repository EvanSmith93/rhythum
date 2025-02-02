import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import SummaryBar from "../components/summaryBar";
import { useEffect, useMemo, useState } from "react";
import { Quote, Session } from "../utils/types";
import { ClientDb } from "../services/clientDb";
import useNotificationScheduler from "../hooks/useNotificationScheduler";
import Error404 from "./404";
import SessionTimes from "../components/sessionTimes";

export default function SessionDetail() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | undefined>();
  const [quote, setQuote] = useState<Quote | undefined>();
  const { scheduleMessage, clearScheduled } = useNotificationScheduler();

  const onBreak = useMemo(
    () => (session ? session.activityChanges.length % 2 === 0 : false),
    [session]
  );

  async function handleMessageScheduling(db: ClientDb, session: Session) {
    if (session && session.activityChanges.length % 2 === 0) {
      const quote = await db.getRandomQuote();
      const message = {
        title: "Ready to keep working?",
        body: `${quote.text}\n-${quote.author}`,
      };

      scheduleMessage(message, 15 * 60 * 1000, () => setQuote(quote));
    } else {
      clearScheduled();
      setQuote(undefined);
    }
  }

  async function toggleBreak() {
    const db = new ClientDb();
    const newSession = await db.toggleBreak(sessionId!);
    setSession(newSession);
    if (newSession) handleMessageScheduling(db, newSession);
  }

  function endSession() {
    const db = new ClientDb();
    db.endSession(sessionId!);
    clearScheduled();
    navigate("/dashboard");
  }

  useEffect(() => {
    async function getSession() {
      const db = new ClientDb();
      const session = await db.getSessionById(sessionId!);
      setSession(session);
    }

    getSession();
  }, [sessionId]);

  if (!session) {
    return <Error404 />;
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

        {quote && (
          <div id="notification" className="alert alert-warning">
            You've been on break for 15 minutes. Ready to keep working?
            <br />
            <i>
              {quote?.text}
              <br />-{quote?.author}
            </i>
          </div>
        )}
      </div>

      <div id="center-content">
        <h3>{summaryText}</h3>
        <SessionTimes session={session} />
        <SummaryBar session={session} width={550} height={45} tooltip />

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

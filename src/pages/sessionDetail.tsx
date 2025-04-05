import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import SummaryBar from "../components/summaryBar";
import { useEffect, useMemo, useState } from "react";
import { Message, Quote, Session } from "../utils/types";
import { db } from "../services/clientDb";
import useNotificationScheduler from "../hooks/useNotificationScheduler";
import Error404 from "./404";
import SessionTimes from "../components/sessionTimes";
import { Trash } from "lucide-react";
import { SocketCommunicator } from "../services/sessionUpdater";

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

  async function getMessage(): Promise<Message> {
    const quote = await db.getRandomQuote();
    if (quote) setQuote(quote);

    const title = "Ready to keep working?";
    const body = quote ? `${quote.text}\n-${quote.author}` : "";

    return { title, body };
  }

  async function handleMessageScheduling(session: Session) {
    if (session && session.activityChanges.length % 2 === 0) {
      scheduleMessage(
        () => getMessage(),
        15 * 60 * 1000
        // 5 * 1000
      );
    } else {
      clearScheduled();
      setQuote(undefined);
    }
  }

  async function toggleBreak() {
    socketCommunicator.toggleBreak(sessionId!);
    // if (!newSession) return;
    // setSession(newSession);
    // if (newSession) handleMessageScheduling(newSession);
  }

  function endSession() {
    socketCommunicator.endSession(sessionId!);
    // clearScheduled();
    // navigate("/dashboard");
  }

  function onToggle(updatedSession: Session) {
    setSession(updatedSession);
    if (updatedSession) handleMessageScheduling(updatedSession);
  }

  function onEnd(updatedSession: Session) {
    setSession(updatedSession);
    clearScheduled();
  }

  const socketCommunicator = useMemo(
    () => new SocketCommunicator({ onToggle, onEnd }),
    []
  );

  function deleteSession() {
    db.deleteSession(sessionId!);
    clearScheduled();
    navigate("/dashboard");
  }

  useEffect(() => {
    async function getSession() {
      const session = await db.getSessionById(sessionId!);
      if (!session) return;
      setSession(session);
    }

    getSession();
  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      socketCommunicator.setSessionIds([sessionId]);
    }

    return () => {
      socketCommunicator.setSessionIds([]);
    };
  }, []);

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
        <div id="top-left">
          <strong>Session Code</strong>
          <br />
          {session.code}

          {session.userEmails.length > 1 && (
            <>
              <div style={{ height: "1rem" }} />
              <strong>Users</strong>
              <br />
              {session.userEmails.map((email) => (
                <div key={email}>{email}</div>
              ))}
            </>
          )}
        </div>
        <div id="top-right">
          <Button variant="outline-danger" onClick={deleteSession}>
            <Trash />
          </Button>
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

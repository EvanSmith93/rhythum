import { useEffect, useState } from "react";
import SessionCard from "../components/sessionCard";
import { Session } from "../utils/types";
import { ClientDb } from "../services/clientDb";

export default function Dashboard() {
  const [currentSessions, setCurrentSessions] = useState<Session[]>([]);
  const [pastSessions, setPastSessions] = useState<Session[]>([]);

  useEffect(() => {
    async function getSessions() {
      const clientDb = new ClientDb();
      const sessions = await clientDb.getSessions("test");
      setCurrentSessions(sessions?.filter((session) => !session.hasEnded) ?? []);
      setPastSessions(sessions?.filter((session) => session.hasEnded) ?? []);
    }

    getSessions();
  }, []);

  return (
    <>
      <p id="welcome">Welcome Cosmo!</p>

      <h2>Current Sessions</h2>
      <SessionList sessions={currentSessions} />

      <h2>Past Sessions</h2>
      <SessionList sessions={pastSessions} />
    </>
  );
}

function SessionList({ sessions }: { sessions: Session[] }) {
  return sessions.map((session) => <SessionCard session={session} />);
}

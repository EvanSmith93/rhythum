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
      setCurrentSessions(
        sessions?.filter((session) => !session.hasEnded) ?? []
      );
      setPastSessions(sessions?.filter((session) => session.hasEnded) ?? []);
    }

    getSessions();
  }, []);

  return (
    <>
      <p id="welcome">Welcome Cosmo!</p>

      <h2>Current Sessions</h2>
      {currentSessions.length ? (
        <SessionList sessions={currentSessions} />
      ) : (
        <p className="text-secondary">No Current Sessions</p>
      )}

      <h2>Past Sessions</h2>
      {pastSessions.length ? (
        <SessionList sessions={pastSessions} />
      ) : (
        <p className="text-secondary">No Past Sessions</p>
      )}
    </>
  );
}

function SessionList({ sessions }: { sessions: Session[] }) {
  return sessions.map((session, index) => (
    <SessionCard key={index} session={session} />
  ));
}

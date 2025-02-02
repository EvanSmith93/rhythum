import { useEffect, useState } from "react";
import SessionCard from "../components/sessionCard";
import { Session } from "../utils/types";
import { ClientDb } from "../services/clientDb";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [currentSessions, setCurrentSessions] = useState<Session[]>([]);
  const [pastSessions, setPastSessions] = useState<Session[]>([]);

  useEffect(() => {
    async function getData() {
      const db = new ClientDb();

      const user = db.getCurrentUser();
      if (user) setUsername(user.username);

      const sessions = await db.getSessions();
      setCurrentSessions(
        sessions?.filter((session) => !session.hasEnded).reverse() ?? []
      );
      setPastSessions(
        sessions?.filter((session) => session.hasEnded).reverse() ?? []
      );
    }

    getData();
  }, []);

  return (
    <>
      <p id="welcome">Welcome {username}</p>

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

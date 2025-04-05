import { useEffect, useState } from "react";
import SessionCard from "../components/sessionCard";
import { Session } from "../utils/types";
import { useUser } from "../hooks/useUser";
import { db } from "../services/clientDb";
import { sessionUpdater } from "../services/sessionUpdater";

export default function Dashboard() {
  const [currentSessions, setCurrentSessions] = useState<Session[]>([]);
  const [pastSessions, setPastSessions] = useState<Session[]>([]);
  const { user } = useUser();

  useEffect(() => {
    async function getData() {
      const sessions = await db.getSessions();
      setCurrentSessions(
        sessions?.filter((session) => !session.hasEnded).reverse() ?? []
      );
      setPastSessions(
        sessions?.filter((session) => session.hasEnded).reverse() ?? []
      );

      // if (sessions) {
      //   sessionUpdater.setSessionIds(sessions.map((session) => session._id));
      // }
    }

    getData();

    // return () => {
    //   sessionUpdater.setSessionIds([]);
    // };
  }, []);

  return (
    <>
      <p id="welcome">Welcome {user?.email}</p>

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

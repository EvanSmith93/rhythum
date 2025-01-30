import SessionCard from "../components/sessionCard";
import { sessions } from "../utils/staticData";
import { Session } from "../utils/types";

export default function Dashboard() {
  const currentSessions = sessions.filter((session) => !session.endTime);
  const pastSessions = sessions.filter((session) => session.endTime);

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
  return sessions.map((session) => (
    <SessionCard session={session} />
  ));
}

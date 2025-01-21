import SessionCard from "../components/sessionCard";

export default function SessionList() {
  const sessions = [
    {
      startTime: new Date("2025-01-15T19:26:00.000Z"),
      endTime: null,
    },
    {
      startTime: new Date("2025-01-08T21:45:00.000Z"),
      endTime: new Date("2025-01-09T00:11:00.000Z"),
    },
    {
      startTime: new Date("2025-01-03T17:28:00.000Z"),
      endTime: new Date("2025-01-03T19:09:00.000Z"),
    },
  ];

  const currentSessions = sessions.filter((session) => !session.endTime);
  const pastSessions = sessions.filter((session) => session.endTime);

  return (
    <>
      <p id="welcome">Welcome Cosmo!</p>

      <h2>Current Sessions</h2>
      {currentSessions.map((session) => (
        <SessionCard session={session} />
      ))}

      <h2>Past Sessions</h2>
      {pastSessions.map((session) => (
        <SessionCard session={session} />
      ))}
    </>
  );
}

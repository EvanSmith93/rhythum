import summaryBar from "../assets/summaryBar.png";
import SessionCard from "../components/sessionCard";

export default function SessionList() {
  return (
    <>
      <p id="welcome">Welcome Cosmo!</p>

      <h2>Current Sessions</h2>
      <a href="session.html">
        <div className="session-card">
          <div>11:26 am - Current</div>
          <img
            className="summary-bar"
            src={summaryBar}
            alt="Summary bar of a session"
            height="30px"
          />
        </div>
      </a>

      <h2>Past Sessions</h2>
      <SessionCard />
      <div className="session-card">
        <div>
          Jan 3, 2025 <br />
          10:28 am - 12:09 pm
        </div>
        <img
          className="summary-bar"
          src={summaryBar}
          alt="Summary bar of a session"
          height="30px"
        />
      </div>
    </>
  );
}

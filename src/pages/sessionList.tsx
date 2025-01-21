import summaryBar from "../assets/summaryBar.png";

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
      <div className="session-card">
        <div>
          Jan 8, 2025 <br />
          2:45 pm - 5:11 pm
        </div>
        <img
          className="summary-bar"
          src={summaryBar}
          alt="Summary bar of a session"
          height="30px"
        />
      </div>
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

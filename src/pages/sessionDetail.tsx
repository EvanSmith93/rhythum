import summaryBar from "../assets/summaryBar.png";

export default function SessionDetail() {
  return (
    <>
      <div id="top-section">
        <div id="session-code">
          <strong>Session Code</strong>
          <br />
          RTUJV
        </div>

        {/* This is where the data from the third party API call will go (from zenquotes.io) */}
        <div id="notification" className="alert alert-warning">
          You've been on break for 15 minutes. Ready to get back into it?
          <br />
          <i>
            Through discipline comes freedom.
            <br />
            -Aristotle
          </i>
        </div>
      </div>

      <div id="center-content">
        <h3>Currently Taking a Break</h3>
        <p>11:26 am - Current</p>
        <img
          className="summary-bar"
          src={summaryBar}
          alt="Summary bar of a session"
          height="45px"
        />

        {/* A WebSocket connection will go here, so other joined users can see when you start/finish a break or end the session */}
        <div>
          <button className="btn btn-primary" id="start-stop-break">
            Finish Break
          </button>
          <a href="list.html">
            <button className="btn btn-primary" id="end-session">
              End Session
            </button>
          </a>
        </div>
      </div>
    </>
  );
}

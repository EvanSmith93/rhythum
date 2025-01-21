import { Button } from "react-bootstrap";
import summaryBar from "../assets/summaryBar.png";
import { Link } from "react-router-dom";

export default function SessionDetail() {
  return (
    <>
      <div id="top-section">
        <div id="session-code">
          <strong>Session Code</strong>
          <br />
          RTUJV
        </div>

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

        <div>
          <Button id="start-stop-break">Finish Break</Button>
          <Link to="/dashboard">
            <Button id="end-session">End Session</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ClientDb } from "../services/clientDb";

export default function DashboardNavbar() {
  const navigate = useNavigate();

  async function createSession() {
    const db = new ClientDb();
    const session = await db.startSession("test");
    if (!session) return;
    navigate(`/sessions/${session.id}`);
  }

  return (
    <Nav className="ms-auto me-4">
      <Nav.Link onClick={createSession}>New Session</Nav.Link>
      <Nav.Link as={Link} to="/join-session">
        Join with Session Code
      </Nav.Link>
      <Nav.Link as={Link} to="/">
        Log Out
      </Nav.Link>
    </Nav>
  );
}

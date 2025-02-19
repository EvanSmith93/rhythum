import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../services/clientDb";
import { useUser } from "../hooks/useUser";

export default function DashboardNavbar() {
  const { refreshUser } = useUser();
  const navigate = useNavigate();

  async function createSession() {
    const session = await db.startSession();
    if (!session) return;
    navigate(`/sessions/${session.id}`);
  }

  async function logout() {
    await db.logout();
    refreshUser();
  }

  return (
    <Nav className="ms-auto me-4">
      <Nav.Link onClick={createSession}>New Session</Nav.Link>
      <Nav.Link as={Link} to="/join-session">
        Join with Session Code
      </Nav.Link>
      <Nav.Link onClick={logout}>Log Out</Nav.Link>
    </Nav>
  );
}

import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function DashboardNavbar() {
  return (
    <Nav className="ms-auto me-4">
      <Nav.Link as={Link} to="/sessions/0">
        New Session
      </Nav.Link>
      <Nav.Link as={Link} to="/join-session">
        Join with Session Code
      </Nav.Link>
      <Nav.Link as={Link} to="/">
        Log Out
      </Nav.Link>
    </Nav>
  );
}

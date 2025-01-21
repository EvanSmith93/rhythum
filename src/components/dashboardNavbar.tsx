import { Nav } from "react-bootstrap";

export default function DashboardNavbar() {
  return (
    <Nav className="ms-auto me-4">
      <Nav.Link href="/session">New Session</Nav.Link>
      <Nav.Link href="/join-session">Join with Session Code</Nav.Link>
      <Nav.Link href="/">Log Out</Nav.Link>
    </Nav>
  );
}
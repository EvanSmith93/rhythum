import { Navbar } from "react-bootstrap";
import logo from "../assets/logo.png";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ navbar }: { navbar?: ReactNode }) {
  const navigate = useNavigate();

  return (
    <header>
      <Navbar className="p-0 ms-4">
        <Navbar.Brand className="navbar-brand" onClick={() => navigate("/")}>
          <img src={logo} width="46px" alt="Rhythum Logo" />
          Rhythum
        </Navbar.Brand>
        {navbar}
      </Navbar>
      <hr />
    </header>
  );
}

import { Navbar } from "react-bootstrap";
import logo from "../public/logo.png";
import { ReactNode } from "react";

export default function Header({ navbar }: { navbar?: ReactNode }) {
  return (
    <header>
      <Navbar className="p-0 ms-4">
        <Navbar.Brand className="navbar-brand" href="/">
          <img src={logo} width="46px" alt="Rhythum Logo" />
          Rhythum
        </Navbar.Brand>
        {navbar}
      </Navbar>
      <hr />
    </header>
  );
}

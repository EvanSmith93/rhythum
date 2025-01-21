import { ReactNode } from "react";
import { Container } from "react-bootstrap";

export default function Center({ children }: { children: ReactNode }) {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center h-100">
      {children}
    </Container>
  );
}

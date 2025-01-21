import { Button, Form } from "react-bootstrap";
import Center from "../components/center";
import { Link } from "react-router-dom";

export default function JoinSession() {
  return (
    <Center>
      <h3>Join with Session Code</h3>
      <Form id="join-form">
        <Form.Control type="text" placeholder="session code" />
        <Link to="/sessions/0">
          <Button>Join</Button>
        </Link>
      </Form>
    </Center>
  );
}

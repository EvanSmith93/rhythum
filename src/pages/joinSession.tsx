import { Button, Form } from "react-bootstrap";
import Center from "../components/center";

export default function JoinSession() {
  return (
    <Center>
      <h3>Join with Session Code</h3>
      <Form id="join-form" method="get" action="session.html">
        <Form.Control type="text" placeholder="session code" />
        <Button type="submit">Join</Button>
      </Form>
    </Center>
  );
}

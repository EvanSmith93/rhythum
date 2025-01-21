import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Center from "../components/center";

export default function Login() {
  return (
    <Center>
      <h3>Log In</h3>
      <Form>
        <Form.Control type="email" placeholder="email" />
        <Form.Control type="password" placeholder="password" />
        <Link to="/dashboard">
          <Button>Log In</Button>
        </Link>
        <Link to="/register">New? Sign up.</Link>
      </Form>
    </Center>
  );
}

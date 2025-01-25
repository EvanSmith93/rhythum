import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Center from "../components/center";

export default function Register() {
  return (
    <Center>
      <h3>Sign Up</h3>
      <Form>
        <Form.Control type="email" placeholder="email" />
        <Form.Control type="text" placeholder="username" />
        <Form.Control type="password" placeholder="password" />
        <Link to="/dashboard">
          <Button>Sign Up</Button>
        </Link>
        <Link to="/">Have an account? Log in.</Link>
      </Form>
    </Center>
  );
}

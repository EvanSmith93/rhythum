import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Center from "../components/center";

export default function Login() {
  return (
    <Center>
      <h3>Log In</h3>
      <Form method="get" action="list.html">
        <Form.Control type="email" placeholder="email" />
        <Form.Control type="password" placeholder="password" />
        <Button type="submit">Log In</Button>
        <Link to="/register">New? Sign up.</Link>
      </Form>
    </Center>
  );
}

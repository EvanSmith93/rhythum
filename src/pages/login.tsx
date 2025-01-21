import { Link } from "react-router-dom";
import "../styles/form.css";
import { Button, Form } from "react-bootstrap";

export default function Login() {
  return (
    <>
      <h3>Log In</h3>
      <Form method="get" action="list.html">
        <Form.Control type="email" placeholder="email" />
        <Form.Control type="password" placeholder="password" />
        <Button type="submit">Log In</Button>
        <Link to="/register">New? Sign up.</Link>
      </Form>
    </>
  );
}

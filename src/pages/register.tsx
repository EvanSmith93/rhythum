import "../styles/main.css";
import "../styles/form.css";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <>
      <h3>Sign Up</h3>
      <Form method="get" action="list.html">
        <Form.Control type="text" placeholder="name" />
        <Form.Control type="email" placeholder="email" />
        <Form.Control type="password" placeholder="password" />
        <Button type="submit">Sign Up</Button>
        <Link to="/">Have an account? Log in.</Link>
      </Form>
    </>
  );
}

import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Center from "../components/center";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit() {
    navigate("/dashboard");
  }

  return (
    <Center>
      <h3>Sign Up</h3>
      <Form onSubmit={onSubmit}>
        <Form.Control
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Form.Control
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <Form.Control
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button
          type="submit"
          disabled={
            email.length < 3 || username.length < 3 || password.length < 3
          }
        >
          Sign Up
        </Button>
        <Link to="/">Have an account? Log in.</Link>
      </Form>
    </Center>
  );
}

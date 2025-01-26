import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Center from "../components/center";
import { useState } from "react";
import { ClientDb } from "../services/clientDb";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit() {
    const db = new ClientDb();
    await db.login(username, password);
    window.location.reload();
  }

  return (
    <Center>
      <h3>Log In</h3>
      <Form onSubmit={onSubmit}>
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
          disabled={username.length < 3 || password.length < 3}
        >
          Log In
        </Button>
        <Link to="/register">New? Sign up.</Link>
      </Form>
    </Center>
  );
}

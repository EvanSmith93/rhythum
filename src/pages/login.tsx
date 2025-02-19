import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Center from "../components/center";
import { useState } from "react";
import { ClientDb } from "../services/clientDb";
import { useUser } from "../hooks/useUser";

export default function Login() {
  const { refreshUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const db = new ClientDb();
    const res = await db.login(email, password);

    if (res) {
      refreshUser();
    } else {
      alert("Incorrect Username or Password");
    }
  }

  return (
    <Center>
      <h3>Log In</h3>
      <Form onSubmit={onSubmit}>
        <Form.Control
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Form.Control
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button type="submit" disabled={password.length < 4}>
          Log In
        </Button>
        <Link to="/register">New? Sign up.</Link>
      </Form>
    </Center>
  );
}

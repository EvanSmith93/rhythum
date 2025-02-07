import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Center from "../components/center";
import { useState } from "react";
import { ClientDb } from "../services/clientDb";
import { useUser } from "../hooks/useUser";

export default function Register() {
  const { refreshUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const db = new ClientDb();
    const res = await db.register(email, password);

    if (res.status === 200) {
      refreshUser();
    } else {
      alert("Registration Failed");
    }
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
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button type="submit" disabled={password.length < 4}>
          Sign Up
        </Button>
        <Link to="/login">Have an account? Log in.</Link>
      </Form>
    </Center>
  );
}

import { Button, Form } from "react-bootstrap";
import Center from "../components/center";
import { ReactNode, useState } from "react";
import { useUser } from "../hooks/useUser";

export default function AuthForm({
  name,
  bottomLink,
  submitAction,
  failedActionMessage,
}: {
  name: string;
  bottomLink: ReactNode;
  submitAction: (email: string, password: string) => Promise<object | null>;
  failedActionMessage: string;
}) {
  const { refreshUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await submitAction(email, password);

    if (res) {
      refreshUser();
    } else {
      alert(failedActionMessage);
    }
  }

  return (
    <Center>
      <h3>{name}</h3>
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
          {name}
        </Button>
        {bottomLink}
      </Form>
    </Center>
  );
}

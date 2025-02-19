import { Alert, Button, Form } from "react-bootstrap";
import Center from "../components/center";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from "../services/clientDb";

export default function JoinSession() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  async function onSubmit() {
    const session = await db.joinSession(code);

    if (session) {
      navigate(`/sessions/${session.id}`);
    } else {
      setShowAlert(true);
    }
  }

  return (
    <>
      {showAlert && (
        <Alert
          variant="danger"
          className="mt-2"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Invalid session code
        </Alert>
      )}
      <Center>
        <h3>Join with Session Code</h3>
        <Form id="join-form">
          <Form.Control
            type="text"
            placeholder="Session Code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
          <Button onClick={onSubmit} disabled={code.length < 5}>
            Join
          </Button>
        </Form>
      </Center>
    </>
  );
}

import { Link } from "react-router-dom";
import { db } from "../services/clientDb";
import AuthForm from "../components/authForm";

export default function Login() {
  return (
    <AuthForm
      name="Log In"
      bottomLink={<Link to="/register">New? Sign up.</Link>}
      submitAction={db.login}
      failedActionMessage="Incorrect Email or Password"
    />
  );
}

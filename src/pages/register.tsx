import { Link } from "react-router-dom";
import { db } from "../services/clientDb";
import AuthForm from "../components/authForm";

export default function Register() {
  return (
    <AuthForm
      name="Sign Up"
      bottomLink={<Link to="/login">Have an account? Log in.</Link>}
      submitAction={db.register}
      failedActionMessage="Email already in use"
    />
  );
}

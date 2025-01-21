import "../styles/main.css";
import "../styles/form.css";

export default function Register() {
  return (
    <>
      <h3>Sign Up</h3>
      <form method="get" action="list.html" className="form-group">
        <div>
          <input type="text" placeholder="name" className="form-control" />
        </div>
        <div>
          <input type="email" placeholder="email" className="form-control" />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            className="form-control"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <a href="index.html">Have an account? Log in.</a>
      </form>
    </>
  );
}

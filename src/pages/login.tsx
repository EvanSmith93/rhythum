export default function Login() {
  return (
    <>
      <h3>Log In</h3>
      <form method="get" action="list.html" className="form-group">
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
            Log In
          </button>
        </div>
        <a href="register.html">New? Sign up.</a>
      </form>
    </>
  );
}

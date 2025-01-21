import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <>
      Sorry! We could not find the page you were looking for. Try going <Link to="/">Back Home</Link>.
    </>
  );
}
